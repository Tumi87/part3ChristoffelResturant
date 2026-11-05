import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';
import { Course, Dish } from '../types';
import { getMenuStats, useMenu } from '../context/MenuContext';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import DishCard from '../components/DishCard';
import StatsPanel from '../components/StatsPanel';
import { dishCount } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'ChefMenu'>;

const FILTERS: Array<Course | 'All'> = ['All', 'Starters', 'Mains', 'Desserts'];

export default function ChefMenuScreen({ navigation }: Props) {
  const { dishes } = useMenu();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Course | 'All'>('All');
  const [showStats, setShowStats] = useState(true); // stats visible by default

  // --- Search and Filter Menu Items ---
  const filteredDishes = useMemo(() => {
    return dishes.filter((d) => {
      const matchesCourse = activeFilter === 'All' || d.course === activeFilter;
      const matchesSearch = d.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCourse && matchesSearch;
    });
  }, [dishes, search, activeFilter]);

  const stats = useMemo(() => getMenuStats(dishes), [dishes]);

  // --- Clear the search and filter to show every dish again ---
  const isFiltering = search.trim().length > 0 || activeFilter !== 'All';
  const clearFilters = () => {
    setSearch('');
    setActiveFilter('All');
  };

  const renderDish = ({ item }: { item: Dish }) => (
    <DishCard dish={item} onPress={() => navigation.navigate('ItemDetails', { dishId: item.id })} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chef's Menu</Text>
        <TouchableOpacity onPress={() => setShowStats((s) => !s)}>
          <Text style={styles.statsToggle}>{showStats ? 'Hide Stats' : 'Show Stats'}</Text>
        </TouchableOpacity>
      </View>

      {/* --- Display Menu Statistics --- */}
      {showStats && <StatsPanel stats={stats} />}

      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === f && styles.filterChipTextActive,
              ]}
            >
              {f} ({f === 'All' ? dishes.length : dishes.filter((d) => d.course === f).length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          Showing {filteredDishes.length} of {dishCount(dishes.length)}
        </Text>
        {isFiltering && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearText}>Clear search & filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredDishes.length === 0 ? (
        // Suitable message when no menu items have been added / match the filters.
        <EmptyState
          title={dishes.length === 0 ? 'Your menu is empty' : 'No matching dishes'}
          message={
            dishes.length === 0
              ? 'No menu items have been added yet. Tap "Add New Dish" to get started.'
              : 'No dishes match your search or filter.'
          }
          actionLabel={dishes.length === 0 ? undefined : 'Show all dishes'}
          onAction={clearFilters}
        />
      ) : (
        <FlatList
          data={filteredDishes}
          keyExtractor={(item) => item.id}
          renderItem={renderDish}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('AddDish')}
      >
        <Text style={styles.addButtonText}>+ Add New Dish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  heading: { fontSize: 24, fontFamily: fonts.heading, color: colors.text },
  statsToggle: { color: colors.darkGreen, fontSize: 13, fontWeight: '600' },
  filterRow: { flexDirection: 'row', marginBottom: 14 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: colors.darkGreen, borderColor: colors.darkGreen },
  filterChipText: { fontSize: 12, color: colors.text },
  filterChipTextActive: { color: colors.white },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultsText: { fontSize: 12, color: colors.subtext },
  clearText: { fontSize: 12, color: colors.darkGreen, fontWeight: '600' },
  addButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: colors.darkGreen,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
});
