import React from 'react';
import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { Dish } from '../types';

interface Props {
  value?: Dish['image'];
  onChange: (image: Dish['image']) => void;
}

/** Lets the chef choose a dish photo from the phone's gallery (optional). */
export default function ImagePickerField({ value, onChange }: Props) {
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Allow photo access in your phone settings to add a dish photo.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      onChange({ uri: result.assets[0].uri });
    }
  };

  return (
    <View>
      <Text style={styles.label}>Photo (optional)</Text>
      <Pressable
        style={styles.box}
        onPress={pickImage}
        accessibilityRole="button"
        accessibilityLabel={value ? 'Change dish photo' : 'Choose dish photo'}
      >
        {value ? (
          <Image source={value} style={styles.preview} resizeMode="cover" />
        ) : (
          <Text style={styles.placeholder}>Tap to choose a photo</Text>
        )}
      </Pressable>
      {value && (
        <View style={styles.actions}>
          <Pressable onPress={pickImage}>
            <Text style={styles.link}>Change photo</Text>
          </Pressable>
          <Pressable onPress={() => onChange(undefined)}>
            <Text style={[styles.link, { color: colors.danger }]}>Remove photo</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, color: colors.subtext, marginBottom: 6, marginTop: 14 },
  box: {
    height: 150,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  preview: { width: '100%', height: '100%' },
  placeholder: { color: colors.subtext, fontSize: 13 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  link: { color: colors.darkGreen, fontSize: 13, fontWeight: '600' },
});
