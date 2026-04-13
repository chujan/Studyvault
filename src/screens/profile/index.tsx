import { db, firebaseAuth } from '../../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Block, Text } from '@components';
import { SvgIcon } from '@components/svg-icon';
import { palette } from '@theme';
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import { BottomSheet, BottomSheetModalRefProps } from '@components/bottom-sheet';
import { AppStackParamList } from '../../navigation/AppStack';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

type MenuItem = {
  label: string;
  icon: string;
  route?: keyof AppStackParamList | undefined;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'View profile', icon: 'user', route: 'ViewProfileScreen' },
  { label: 'Performance Analysis', icon: 'bar-chart', route: 'Analysis' },
  { label: 'Payment method', icon: 'wallet' },
  { label: 'Exam History', icon: 'note', route: 'ExamHistoryScreen' },
  { label: 'Settings', icon: 'settings', route: 'SettingsScreen' },
  { label: 'Change Password', icon: 'security', route: 'ChangePasswordScreen' },
  { label: 'Reminders', icon: 'time' , route: 'ReminderScreen'},
  { label: 'Bookmarks', icon: 'book-marked' , route: 'BookmarkedScreen'},
  { label: 'Groups', icon: 'people' },
  { label: 'Delete Account', icon: 'delete' },
  { label: 'Sign out', icon: 'sign-out' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModalRefProps>(null);

  const [userData, setUserData] = useState<any>(null);
  const [sheetType, setSheetType] = useState<'delete' | 'signout' | null>(null);
  const [password, setPassword] = useState('');

  /* ================= SHEET HANDLERS ================= */
  const openDeleteSheet = () => {
    setSheetType('delete');
    bottomSheetRef.current?.presentBottomSheet();
  };

  const openSignOutSheet = () => {
    setSheetType('signout');
    bottomSheetRef.current?.presentBottomSheet();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.dismissBottomSheet();
    setSheetType(null);
    setPassword('');
  };

  /* ================= DELETE LOGIC ================= */
  const handleDeleteAccount = async () => {
    try {
      const user = firebaseAuth.currentUser;

      if (!user || !user.email) return;

      const credential = auth.EmailAuthProvider.credential(
        user.email,
        password
      );

      await user.reauthenticateWithCredential(credential);

      await db.collection('users').doc(user.uid).delete();
      await user.delete();

      closeSheet();
    } catch (error: any) {
      console.log('Delete error:', error);

      if (error.code === 'auth/wrong-password') {
        alert('Incorrect password');
      } else {
        alert('Something went wrong');
      }
    }
  };

  /* ================= SIGN OUT ================= */
  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      closeSheet();
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Profile',
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [navigation]);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const currentUser = firebaseAuth.currentUser;

    if (currentUser) {
      const unsubscribe = db
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot(
          (doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
            if (doc.exists()) {
              const data = doc.data();
              if (data) {
                setUserData(data);
              }
            }
          },
          (error) => {
            console.log('Error fetching user data:', error);
          }
        );

      return () => unsubscribe();
    }
  }, []);

  return (
    <Block style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <Block style={styles.cardContainer}>
          {/* PROFILE */}
          <Block style={styles.profileSection}>
            <Image
              source={{
                uri:
                  userData?.photoURL ||
                  firebaseAuth.currentUser?.photoURL ||
                  'https://i.pravatar.cc/150',
              }}
              style={styles.avatar}
            />

            <Text style={styles.name}>
              {userData?.name ||
                firebaseAuth.currentUser?.displayName ||
                'No Name'}
            </Text>

            <Text style={styles.email}>
              {userData?.email || firebaseAuth.currentUser?.email}
            </Text>
          </Block>

          {/* MENU */}
          <Block style={styles.menuSection}>
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.label === 'Sign out') {
                      openSignOutSheet();
                      return;
                    }

                    if (item.label === 'Delete Account') {
                      openDeleteSheet();
                      return;
                    }

                    if (item.route) {
                      navigation.navigate(item.route as never);
                    }
                  }}
                >
                  <Block style={styles.menuLeft}>
                    <Block style={styles.iconWrapper}>
                      <SvgIcon
                        name={item.icon}
                        width={15}
                        height={15}
                        color={palette.blue}
                      />
                    </Block>
                    <Text style={styles.menuText}>{item.label}</Text>
                  </Block>

                  <SvgIcon
                    name="arrow-right"
                    width={24}
                    height={28}
                    color="#C4C4C4"
                  />
                </TouchableOpacity>

                {index !== MENU_ITEMS.length - 1 && (
                  <Block style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </Block>
        </Block>
      </ScrollView>

      {/* ================= BOTTOM SHEET ================= */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['45%']}>
        <Block style={{ padding: 20 }}>
          {sheetType === 'delete' && (
            <>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
                Delete Account
              </Text>

              <Text style={{ color: '#666', marginBottom: 15 }}>
                Enter your password to confirm deletion.
              </Text>

              <Block
                style={{
                  borderWidth: 1,
                  borderColor: palette.border,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  placeholder="Enter password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={{ height: 45 }}
                />
              </Block>

              <TouchableOpacity
                onPress={handleDeleteAccount}
                style={{
                  backgroundColor: 'red',
                  padding: 14,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Confirm Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeSheet}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}
              >
                <Text style={{ textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}

          {sheetType === 'signout' && (
            <>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
                Sign Out
              </Text>

              <Text style={{ color: '#666', marginBottom: 20 }}>
                Are you sure you want to sign out?
              </Text>

              <TouchableOpacity
                onPress={handleSignOut}
                style={{
                  backgroundColor: palette.blue,
                  padding: 14,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Yes, Sign Out
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeSheet}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}
              >
                <Text style={{ textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </Block>
      </BottomSheet>
    </Block>
  );
}
