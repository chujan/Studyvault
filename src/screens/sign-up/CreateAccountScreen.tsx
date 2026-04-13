// src/screens/CreateAccountScreen.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Block, SvgIcon } from '@components';
import { palette, family } from '@theme';
import {styles} from './styles';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getFirebaseAuth = () => auth();
const getFirestore = () => firestore();

const CreateAccountScreen = () => {
  const navigation = useNavigation<any>();

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
 

  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      const firebaseAuth = getFirebaseAuth();
      const db = getFirestore();

      const userCredential =
        await firebaseAuth.createUserWithEmailAndPassword(
          email.trim(),
          password
        );

      const user = userCredential.user;

      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      await db.collection('users').doc(user.uid).set({
        uid: user.uid,
        firstName,
        lastName,
        email: email.trim(),
        createdAt: new Date(),
      });

      setErrorMessage('');
      navigation.navigate('Tabs');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already exists');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Password should be at least 6 characters');
      } else {
        setErrorMessage(error.message || 'Unknown error');
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
        <Block style={styles.containers}>
          <Text style={styles.logos}>MySchool</Text>
          <Text style={styles.title}>Create Account</Text>
         
            <Text>Get started to prepare for your test </Text>
       

          {/* Apple Button */}
          <TouchableOpacity style={styles.appleBtn}>
            <SvgIcon name="apple" size={22} />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* OR */}
          <Text style={styles.or}>OR</Text>

          {/* Inputs */}
          <Block style={styles.inputContainers}>
            <TextInput
              placeholder="First Name"
              style={styles.inputs}
              value={firstName}
              onChangeText={setFirstName}
            />
          </Block>

          <Block style={styles.inputContainers}>
            <TextInput
              placeholder="Last Name"
              style={styles.inputs}
              value={lastName}
              onChangeText={setLastName}
            />
          </Block>

          <Block style={styles.inputRow}>
            <TextInput
              placeholder="Email"
              style={styles.inputFlex}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <SvgIcon name="mail" size={18} />
          </Block>

          <Block style={styles.inputRow}>
            <TextInput
              placeholder="Password"
              secureTextEntry={secure}
              style={styles.inputFlex}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <SvgIcon
                name={secure ? 'eye-closed' : 'eye-open'}
                size={20}
              />
            </TouchableOpacity>
          </Block>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity onPress={handleCreateAccount}>
            <Block style={styles.createBtn}>
              <Text style={styles.createText}>
                Create an Account
              </Text>
            </Block>
          </TouchableOpacity>

          <Block
            row
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;

