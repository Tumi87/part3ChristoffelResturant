import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

/** Search box with a clear (✕) button. */
export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search dishes..."
        placeholderTextColor={colors.subtext}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel="Search dishes by name"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clear}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 14, color: colors.text },
  clear: { color: colors.subtext, fontSize: 16, paddingLeft: 8 },
});
