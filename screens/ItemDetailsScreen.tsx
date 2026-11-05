import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';
import { useMenu } from '../context/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetails'>;

export default function ItemDetailsScreen({ route, navigation }: Props) {
  const { dishId } = route.params;
  const { getDish, deleteDish } = useMenu();
  const dish = getDish(dishId);

  if (!dish) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.emptyText}>This dish could not be found. It may have been deleted.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ChefMenu')}>
            <Text style={styles.backButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Dish', `Remove "${dish.name}" from the menu?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteDish(dish.id);
          navigation.navigate('ChefMenu');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ChefMenu')}>
          <Text style={styles.topBarLink}>{'< Menu'}</Text>
        </TouchableOpacity>
        <Text style={styles.topBarLabel}>DISH DOSSIER</Text>
        <View style={{ width: 50 }} />
      </View>

      {dish.image ? (
        <Image source={dish.image} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.image} />
      )}

      <View style={styles.container}>
        <Text style={styles.course}>{dish.course.toUpperCase()}</Text>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.price}>R{dish.price}</Text>
        </View>

        <Text style={styles.sectionLabel}>PREPARATION NOTES</Text>
        <Text style={styles.description}>{dish.description}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('EditDish', { dishId: dish.id })}
        >
          <Text style={styles.editButtonText}>Edit Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} activeOpacity={0.85} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ChefMenu')}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topBarLink: { color: colors.darkGreen, fontSize: 14, fontWeight: '600' },
  topBarLabel: { fontSize: 11, letterSpacing: 2, color: colors.subtext },
  image: {
    height: 200,
    marginHorizontal: 20,
    borderRadius: 14,
    backgroundColor: colors.offWhite,
  },
  container: { padding: 20 },
  course: { fontSize: 11, letterSpacing: 2, color: colors.gold, marginBottom: 6 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { flex: 1, fontSize: 22, fontFamily: fonts.heading, color: colors.text, marginRight: 10 },
  price: { fontSize: 20, color: colors.darkGreen, fontWeight: '700' },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.subtext,
    marginTop: 24,
    marginBottom: 8,
  },
  description: { fontSize: 14, color: colors.text, lineHeight: 21 },
  footer: { paddingHorizontal: 20, paddingBottom: 24, marginTop: 'auto' },
  editButton: {
    backgroundColor: colors.darkGreen,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  backButton: { alignItems: 'center', paddingVertical: 6 },
  backButtonText: { color: colors.subtext, fontSize: 13 },
  emptyText: { textAlign: 'center', color: colors.subtext, fontSize: 14, marginBottom: 16 },
});
