import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';

interface Props {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <Pressable style={styles.action} onPress={onAction} accessibilityRole="button">
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 18, fontFamily: fonts.heading, color: colors.text, marginBottom: 6 },
  message: { textAlign: 'center', color: colors.subtext, fontSize: 14, lineHeight: 20 },
  action: {
    marginTop: 18,
    backgroundColor: colors.darkGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  actionText: { color: colors.white, fontWeight: '600', fontSize: 14 },
});
