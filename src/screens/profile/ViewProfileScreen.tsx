import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { palette } from '@theme';
import { styles } from './styles';
import { RS } from '@helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db, firebaseAuth } from '../../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type RootStackParamList = {
  ViewProfileScreen: undefined;
  ProfileEditScreen: { tab: 'personal' | 'contact' | 'school' };
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ViewProfileScreen'
>;

interface UserData {
  firstName?: string;
  lastName?: string;
  name?: string; // combined first + last
  username?: string;
  email?: string;
  bio?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  relationship?: string;
  interest?: string;
  hobbies?: string;
  interests?: string;
  followers?: number;
  following?: number;
  school?: string;
}

const ViewProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = firebaseAuth.currentUser;
      if (!user) return;

      try {
        const doc = await db.collection('users').doc(user.uid).get();

        if (doc.exists()) {
          const data = doc.data() as UserData;

          // ✅ Combine firstName and lastName into name
          const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');

          setUserData({
            ...data,
            name: fullName || '---',
          });
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const InfoItem: React.FC<{ icon: string; title: string; value: string | number | undefined }> = ({
    icon,
    title,
    value,
  }) => (
    <Block row align="center" style={{ marginBottom: 20 }}>
      <Block
        width={45}
        height={45}
        radius={22.5}
        align="center"
        justify="center"
        style={{ marginRight: 15, backgroundColor: '#EAF1FF' }}
      >
        <SvgIcon name={icon} size={20} color={palette.blue} />
      </Block>

      <Block>
        <Text size={14} color={palette.grayScale4}>
          {title}
        </Text>
        <Text size={16} semibold style={{ marginTop: 2 }}>
          {value ?? '--'}
        </Text>
      </Block>
    </Block>
  );

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </Block>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        {/* Profile Card */}
        <Block borderWidth={1} borderColor={'#E6E8EC'} radius={16} style={{ padding: 16, marginBottom: 25, marginTop: 20 }}>
          <Block row align="center">
            <Block width={60} height={60} radius={30} style={{ marginRight: 12, backgroundColor: palette.grayScale4 }} />
            <Block>
              <Text size={18} semibold>{userData.name ?? '---'}</Text>
              <Text size={14} color={palette.grayScale4}>@{userData.username ?? '---'}</Text>
            </Block>
          </Block>

          <Text style={{ marginTop: 10 }} color={palette.grayScale4}>{userData.bio ?? '--'}</Text>

          <Block row align="center" style={{ marginTop: 12 }}>
            <Text semibold>{userData.followers ?? 0}</Text>
            <Text color={palette.grayScale4}> Follower</Text>

            <Text style={{ marginHorizontal: 8 }}>•</Text>

            <Text semibold>{userData.following ?? 0}</Text>
            <Text color={palette.grayScale4}> Following</Text>
          </Block>

          <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen', { tab: 'personal' })}>
            <Block align="flex-start" radius={25} style={{ marginTop: 16 }}>
              <Block radius={25} style={{ paddingVertical: 12, paddingHorizontal: 20, backgroundColor: palette.black }}>
                <Text color={palette.white} semibold>Edit Profile</Text>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>

        {/* Personal Info */}
        <Block row align="center" justify="space-between" style={{ marginBottom: 15 }}>
          <Text size={16} semibold>Personal Information</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen', { tab: 'personal' })}>
            <Block row align="center">
              <Text color={palette.blue} semibold style={{ marginRight: 5 }}>Edit</Text>
              <SvgIcon name="pen" size={16} color={palette.blue} />
            </Block>
          </TouchableOpacity>
        </Block>

        <InfoItem icon="user" title="Gender" value={userData.gender} />
        <InfoItem icon="cake" title="Date of Birth" value={userData.dob} />
        <InfoItem icon="love" title="Current Relationship" value={userData.relationship} />
        <InfoItem icon="love" title="Interested Relationship" value={userData.interest} />
        <InfoItem icon="star" title="Hobbies" value={userData.hobbies} />
        <InfoItem icon="star" title="My Interests" value={userData.interests} />

        {/* Contact Info */}
        <Block row align="center" justify="space-between" style={{ marginBottom: 15 }}>
          <Text size={16} semibold>Contact Information</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen', { tab: 'contact' })}>
            <Block row align="center">
              <Text color={palette.blue} semibold style={{ marginRight: 5 }}>Edit</Text>
              <SvgIcon name="pen" size={16} color={palette.blue} />
            </Block>
          </TouchableOpacity>
        </Block>

        <InfoItem
          icon="email"
          title="Email"
          value={userData.email ?? firebaseAuth.currentUser?.email ?? undefined}
        />
        <InfoItem icon="call" title="Mobile Phone" value={userData.phone} />

        {/* School Info */}
        <Block row align="center" justify="space-between" style={{ marginBottom: 15 }}>
          <Text size={16} semibold>Schooling Information</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen', { tab: 'school' })}>
            <Block row align="center">
              <Text color={palette.blue} semibold style={{ marginRight: 5 }}>Edit</Text>
              <SvgIcon name="pen" size={16} color={palette.blue} />
            </Block>
          </TouchableOpacity>
        </Block>

        <InfoItem icon="school" title="School" value={userData.school} />
      </ScrollView>
    </Block>
  );
};

export default ViewProfileScreen;