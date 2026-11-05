import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // --- Validation for required fields + appropriate error messages ---
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    // In a full build, this is where you'd call your auth API.
    navigation.replace('ChefMenu');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>{mode === 'login' ? 'Log In' : 'Sign Up'}</Text>
          <Text style={styles.subheading}>
            {mode === 'login'
              ? 'Welcome back to Maison Christoffel.'
              : 'Create a chef account to manage the menu.'}
          </Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@maisonchristoffel.com"
            placeholderTextColor={colors.subtext}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.subtext}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{mode === 'login' ? 'Log In' : 'Create Account'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setError(null);
              setMode(mode === 'login' ? 'signup' : 'login');
            }}
          >
            <Text style={styles.switchText}>
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Log in'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  heading: { fontSize: 28, fontFamily: fonts.heading, color: colors.text, marginBottom: 6 },
  subheading: { fontSize: 14, color: colors.subtext, marginBottom: 20 },
  errorText: {
    color: colors.danger,
    backgroundColor: '#F8ECEC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
  },
  label: { fontSize: 12, color: colors.subtext, marginBottom: 6, marginTop: 12 },
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
  button: {
    backgroundColor: colors.darkGreen,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: colors.white, fontWeight: '600', fontSize: 15 },
  switchText: {
    textAlign: 'center',
    color: colors.darkGreen,
    marginTop: 16,
    fontSize: 13,
  },
});
