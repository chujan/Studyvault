/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Block, Text, SvgIcon } from '@components';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// ---------------- Helpers ----------------
const getFirebaseAuth = (): FirebaseAuthTypes.Module => auth();
const getFirestore = (): FirebaseFirestoreTypes.Module => firestore();

interface UserData {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
}

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [secure, setSecure] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ---------------- Handlers ----------------
  const handleLogin = async () => {
  if (!emailOrUsername || !password) {
    setErrorMessage('Please enter both email/username and password');
    return;
  }

  try {
    const firebaseAuth = getFirebaseAuth();
    const db = getFirestore();

    const userCredential = await firebaseAuth.signInWithEmailAndPassword(
      emailOrUsername.trim(),
      password
    );

    const user = userCredential.user;

    const userDoc = await db.collection('users').doc(user.uid).get();

    const userData: UserData | null = userDoc.exists()
      ? (userDoc.data() as UserData)
      : null;

    setErrorMessage('');
    navigation.navigate('Tabs', { userData });
  } catch (error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        setErrorMessage('No user found with this email');
        break;
      case 'auth/wrong-password':
        setErrorMessage('Incorrect password');
        break;
      case 'auth/invalid-email':
        setErrorMessage('Invalid email address');
        break;
      default:
        setErrorMessage(error.message || 'Unknown error');
        break;
    }
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Block safe style={styles.container}>
          <StatusBar barStyle="dark-content" />

          {/* Logo */}
          <Text style={styles.logo}>MySchool</Text>

          {/* Welcome */}
          <Text style={styles.welcome}>Welcome Back</Text>

          {/* Apple Button */}
          <TouchableOpacity style={styles.appleBtn}>
            <SvgIcon name="apple" size={22} />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* OR */}
          <Text style={styles.or}>OR</Text>

          {/* Username / Email */}
          <Block style={styles.inputContainer}>
            <TextInput
              placeholder="Username or Email"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={emailOrUsername}
              onChangeText={setEmailOrUsername}
              autoCapitalize="none"
            />
            <SvgIcon name="user" size={20} />
          </Block>

          {/* Password */}
          <Block style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={secure}
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <SvgIcon name={secure ? 'eye-closed' : 'eye-open'} size={20} />
            </TouchableOpacity>
          </Block>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={[styles.forgot, { color: 'red', marginBottom: 10 }]}>
              {errorMessage}
            </Text>
          ) : null}

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password ?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.terms}>
            By logging in, you agree to our{' '}
            <Text style={styles.link}>Privacy Policies</Text> and{' '}
            <Text style={styles.link}>Terms of Service</Text>
          </Text>

          {/* Bottom */}
          <Block
            style={[
              styles.bottom,
              {
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              },
            ]}
          >
            <Text>New here? </Text>

            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.create}>Create Account</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;