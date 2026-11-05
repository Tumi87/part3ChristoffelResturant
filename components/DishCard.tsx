import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Dish } from '../types';
import { formatPrice } from '../utils/format';

interface Props {
  dish: Dish;
  onPress: () => void;
}

/** One row in the Chef's Menu list. */
export default function DishCard({ dish, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${dish.name}, ${dish.course}, ${formatPrice(dish.price)}`}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
      onPress={onPress}
    >
      {dish.image ? (
        <Image source={dish.image} style={styles.thumb} resizeMode="cover" />
      ) : (
        // New dishes have no photo yet: show the first letter instead of a blank box.
        <View style={[styles.thumb, styles.placeholder]}>
          <Text style={styles.placeholderText}>{dish.name.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.course}>{dish.course.toUpperCase()}</Text>
        <Text style={styles.name}>{dish.name}</Text>
      </View>
      <Text style={styles.price}>{formatPrice(dish.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: { width: 48, height: 48, borderRadius: 8, marginRight: 12 },
  placeholder: { backgroundColor: colors.offWhite, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: colors.gold, fontSize: 20, fontWeight: '700' },
  course: { fontSize: 10, color: colors.subtext, letterSpacing: 1 },
  name: { fontSize: 15, color: colors.text, fontWeight: '600', marginTop: 2 },
  price: { fontSize: 14, color: colors.darkGreen, fontWeight: '700' },
});
