import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroImageWrapper}>
          <Image
            source={require('../../assets/images/restaurant-interior.jpg')}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.iconGlyph}>{'\u2694'}</Text>
            <Text style={styles.heroTitle}>Maison</Text>
            <Text style={styles.heroSubtitle}>CHRISTOFFEL</Text>
            <Text style={styles.heroLocation}>CAPE TOWN • FRANSCHHOEK</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.welcomeHeading}>Welcome to Maison</Text>
          <Text style={styles.welcomeCopy}>
            Experience culinary excellence refined by French heritage and South African
            terroir.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Explore Chef's Menu</Text>
          </TouchableOpacity>

          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1, justifyContent: 'space-between' },
  heroImageWrapper: {
    height: '42%',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: { ...StyleSheet.absoluteFillObject, resizeMode: 'cover' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGlyph: { color: colors.white, fontSize: 20, marginBottom: 8 },
  heroTitle: {
    color: colors.white,
    fontSize: 34,
    fontFamily: fonts.heading,
  },
  heroSubtitle: { color: colors.white, letterSpacing: 4, marginTop: 4, fontWeight: '600' },
  heroLocation: { color: colors.white, fontSize: 11, letterSpacing: 2, marginTop: 8 },
  body: { paddingHorizontal: 24 },
  welcomeHeading: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.text,
    marginBottom: 10,
  },
  welcomeCopy: { fontSize: 14, color: colors.subtext, lineHeight: 20 },
  footer: { paddingHorizontal: 24, paddingBottom: 32 },
  button: {
    backgroundColor: colors.darkGreen,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginHorizontal: 3,
  },
  dotActive: { backgroundColor: colors.darkGreen, width: 16 },
});
