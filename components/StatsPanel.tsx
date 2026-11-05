import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/colors';
import { formatPrice, dishCount } from '../utils/format';

interface Props {
  stats: {
    totalItems: number;
    overallAvg: number;
    perCourse: { course: string; count: number; avgPrice: number }[];
  };
}

/** Menu overview: total dishes, average price, and a per-course breakdown. */
export default function StatsPanel({ stats }: Props) {
  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Menu Overview</Text>
      <View style={styles.tiles}>
        <View style={styles.tile}>
          <Text style={styles.tileValue}>{stats.totalItems}</Text>
          <Text style={styles.tileLabel}>Total dishes</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileValue}>{formatPrice(stats.overallAvg)}</Text>
          <Text style={styles.tileLabel}>Average price</Text>
        </View>
      </View>
      {stats.perCourse.map((c) => (
        <View key={c.course} style={styles.row}>
          <Text style={styles.course}>{c.course}</Text>
          <Text style={styles.detail}>
            {dishCount(c.count)}
            {c.count > 0 ? `  •  avg ${formatPrice(c.avgPrice)}` : ''}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: colors.offWhite, borderRadius: 10, padding: 14, marginBottom: 14 },
  heading: { fontSize: 16, fontFamily: fonts.heading, color: colors.text, marginBottom: 10 },
  tiles: { flexDirection: 'row', marginBottom: 8 },
  tile: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tileValue: { fontSize: 20, fontWeight: '700', color: colors.darkGreen },
  tileLabel: { fontSize: 11, color: colors.subtext, marginTop: 2 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  course: { fontSize: 13, color: colors.text, fontWeight: '600' },
  detail: { fontSize: 13, color: colors.subtext },
});
