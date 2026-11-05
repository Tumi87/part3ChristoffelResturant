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

type Props = NativeStackScreenProps<RootStackParamList, 'EditDish'>;

export default function EditDishScreen({ route, navigation }: Props) {
  const { dishId } = route.params;
  const { getDish, updateDish, deleteDish } = useMenu();
  const existing = getDish(dishId);

  const [name, setName] = useState(existing?.name ?? '');
  const [course, setCourse] = useState<Course>(existing?.course ?? 'Starters');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [price, setPrice] = useState(existing ? String(existing.price) : '');
  const [image, setImage] = useState<Dish['image']>(existing?.image);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!existing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>This dish no longer exists.</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ChefMenu')}>
            <Text style={styles.cancelButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const validate = () => {
    const next = validateDishForm({ name, course, description, price });
    setErrors(next as { [key: string]: string });
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateDish({
      id: existing.id,
      name: name.trim(),
      course,
      description: description.trim(),
      price: parsePrice(price),
      image, // keeps the current photo unless the chef changed or removed it
    });
    Alert.alert('Dish Updated', `${name.trim()} has been updated.`, [
      { text: 'OK', onPress: () => navigation.navigate('ItemDetails', { dishId: existing.id }) },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('Delete Dish', `Permanently remove "${existing.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteDish(existing.id);
          navigation.navigate('ChefMenu');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Edit Menu Item</Text>

        <Text style={styles.label}>Dish Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
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
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Text style={styles.label}>Price (R)</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="decimal-pad" />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <ImagePickerField value={image} onChange={setImage} />

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} activeOpacity={0.85} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Dish</Text>
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
  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  cancelButton: { alignItems: 'center', marginTop: 14 },
  cancelButtonText: { color: colors.subtext, fontSize: 13 },
});
