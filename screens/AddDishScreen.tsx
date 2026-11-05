import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';
import { COURSES, Course, Dish } from '../types';
import { useMenu } from '../context/MenuContext';
import { validateDishForm, parsePrice } from '../utils/validation';
import ImagePickerField from '../components/ImagePickerField';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDish'>;

export default function AddDishScreen({ navigation }: Props) {
  const { addDish } = useMenu();

  const [name, setName] = useState('');
  const [course, setCourse] = useState<Course>('Starters');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<Dish['image']>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const next = validateDishForm({ name, course, description, price });
    setErrors(next as { [key: string]: string });
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    addDish({
      name: name.trim(),
      course,
      description: description.trim(),
      price: parsePrice(price),
      image,
    });

    // Confirmation when a menu item has been successfully added.
    Alert.alert('Dish Added', `${name.trim()} has been added to the Chef's Menu.`, [
      { text: 'OK', onPress: () => navigation.navigate('ChefMenu') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add New Dish</Text>

        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Karoo Lamb Cutlets"
          placeholderTextColor={colors.subtext}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Course</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={course} onValueChange={(value) => setCourse(value as Course)}>
            {COURSES.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Preparation Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the dish, key ingredients and plating..."
          placeholderTextColor={colors.subtext}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Text style={styles.label}>Price (R)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 285"
          placeholderTextColor={colors.subtext}
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <ImagePickerField value={image} onChange={setImage} />

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Dish</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  container: { padding: 24, paddingBottom: 48 },
  heading: { fontSize: 24, fontFamily: fonts.heading, color: colors.text, marginBottom: 20 },
  label: { fontSize: 12, color: colors.subtext, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: colors.white,
    color: colors.text,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 6 },
  saveButton: {
    backgroundColor: colors.darkGreen,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  cancelButton: { alignItems: 'center', marginTop: 14 },
  cancelButtonText: { color: colors.subtext, fontSize: 13 },
});
