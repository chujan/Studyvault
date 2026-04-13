import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Block, SvgIcon } from '@components';
import { palette } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { RS } from '@helpers';
import { styles } from './styles';

const ChangePasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [secure, setSecure] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    setErrorMessage('All fields are required');
    return;
  }

  if (newPassword !== confirmPassword) {
    setErrorMessage('Passwords do not match');
    return;
  }

  try {
    const user = auth().currentUser;

    if (!user || !user.email) {
      setErrorMessage('User not found');
      return;
    }

    // STEP 1: Re-authenticate user
    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await user.reauthenticateWithCredential(credential);

    //  STEP 2: Update password
    await user.updatePassword(newPassword);

    setErrorMessage('');
    alert('Password updated successfully');

  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      setErrorMessage('Current password is incorrect');
    } else if (error.code === 'auth/weak-password') {
      setErrorMessage('New password should be at least 6 characters');
    } else {
      setErrorMessage(error.message);
    }
  }
};



  return (
    <Block flex={1} style={{ backgroundColor: palette.white }}>
      {/* HEADER */}
      <Block
        row
        align="center"
        justify="center"
        paddingHorizontal={RS(20)}
        paddingVertical={RS(16)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
      </Block>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: RS(20) }}
        >
          {/* CURRENT PASSWORD */}
          <Block style={styles.inputRow}>
            <TextInput
              placeholder="Current Password"
              secureTextEntry={secure}
              style={styles.inputFlex}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <SvgIcon name={secure ? 'eye-closed' : 'eye-open'} size={20} />
            </TouchableOpacity>
          </Block>

          {/* NEW PASSWORD */}
          <Block style={styles.inputRow}>
            <TextInput
              placeholder="New Password"
              secureTextEntry={secure}
              style={styles.inputFlex}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <SvgIcon name={secure ? 'eye-closed' : 'eye-open'} size={20} />
            </TouchableOpacity>
          </Block>

          {/* CONFIRM PASSWORD */}
          <Block style={styles.inputRow}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={secure}
              style={styles.inputFlex}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <SvgIcon name={secure ? 'eye-closed' : 'eye-open'} size={20} />
            </TouchableOpacity>
          </Block>

          {/* ERROR */}
          {errorMessage ? (
            <Text style={{ color: 'red', marginTop: RS(10) }}>
              {errorMessage}
            </Text>
          ) : null}

          {/* BUTTON */}
          <TouchableOpacity
  style={styles.saveButton}
  onPress={handleChangePassword}
>
  <Text style={styles.saveButtonText}>Save Changes</Text>
</TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default ChangePasswordScreen;