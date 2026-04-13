import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@theme';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { db, firebaseAuth } from '../../config/firebase';

const ProfileEditScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<'personal' | 'contact' | 'school'>('personal');

  useEffect(() => {
    if (route?.params?.tab) setActiveTab(route.params.tab);
  }, [route?.params?.tab]);

  // PERSONAL
  const [firstName, setFirstName] = useState('Jennifer');
  const [lastName, setLastName] = useState('Chukwuemeka');
  const [username, setUsername] = useState('chujan');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [interestIn, setInterestIn] = useState('');
  const [myInterest, setMyInterest] = useState('');
  const [hobbies, setHobbies] = useState('');

  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other'];
  const relationshipOptions = ['Single', 'In a relationship', 'Married', 'Complicated'];
  const interestOptions = ['Men', 'Women', 'Both'];

  // CONTACT
  const [email, setEmail] = useState('--');
  const [phone, setPhone] = useState('+234 800 000 0000');

  // SCHOOL
  const [school, setSchool] = useState('');

  const userUID = firebaseAuth.currentUser?.uid;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userUID) return;

      try {
        const doc = await db.collection('users').doc(userUID).get();
        if (doc.exists()) {
          const data = doc.data();
          setFirstName(data?.firstName || 'Jennifer');
          setLastName(data?.lastName || 'Chukwuemeka');
          setUsername(data?.username || 'chujan');
          setBio(data?.bio || '');
          setDob(data?.dob || '');
          setGender(data?.gender || '');
          setRelationship(data?.relationship || '');
          setInterestIn(data?.interest || '');
          setMyInterest(data?.myInterest || '');
          setHobbies(data?.hobbies || '');
          setEmail(data?.email || '--');
          setPhone(data?.phone || '+234 800 000 0000');
          setSchool(data?.school || '');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [userUID]);

  const saveChanges = async () => {
    if (!userUID) return;

    try {
      await db.collection('users').doc(userUID).update({
        firstName,
        lastName,
        username,
        bio,
        dob,
        gender,
        relationship,
        interest: interestIn,
        myInterest,
        hobbies,
        email,
        phone,
        school,
      });

      Alert.alert('Success', 'Profile updated successfully!');
     
    } catch (err) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
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

        {/* TITLE */}
        <Block style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <Text size={22} fontWeight="600">Profile Edit</Text>
        </Block>

        {/* TABS */}
        <Block row style={{
          backgroundColor: '#E5E5E5',
          borderRadius: RS(30),
          padding: RS(4),
          marginTop: RS(20),
          marginHorizontal: RS(16),
        }}>
          {['personal', 'contact', 'school'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={{
                flex: 1,
                backgroundColor: activeTab === tab ? '#fff' : 'transparent',
                paddingVertical: RS(10),
                borderRadius: RS(25),
                alignItems: 'center',
              }}
            >
              <Text weight={activeTab === tab ? '600' : '400'}>
                {tab === 'personal' ? 'Personal Info' : tab === 'contact' ? 'Contact Info' : 'School Info'}
              </Text>
            </TouchableOpacity>
          ))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <Block style={{ paddingHorizontal: 16, marginTop: 30 }}>

            {activeTab === 'personal' && (
              <>
                {/* Inputs */}
                {[ 
                  ['First Name', firstName, setFirstName],
                  ['Last Name', lastName, setLastName],
                  ['Username', username, setUsername],
                ].map(([label, value, setter]: any, i) => (
                  <React.Fragment key={i}>
                    <Text style={{ marginTop: i === 0 ? 20 : 16, marginBottom: 6 }}>{label}</Text>
                    <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, paddingHorizontal: 12 }}>
                      <TextInput value={value} onChangeText={setter} style={{ height: 45 }} />
                    </Block>
                  </React.Fragment>
                ))}

                {/* Bio */}
                <Text style={{ marginTop: 16, marginBottom: 6 }}>About me</Text>
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, padding: 12 }}>
                  <TextInput value={bio} onChangeText={setBio} multiline style={{ height: 100 }} />
                </Block>

                {/* DOB */}
                <Text style={{ marginTop: 16, marginBottom: 6 }}>Date of Birth</Text>
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, paddingHorizontal: 12 }}>
                  <TextInput value={dob} onChangeText={setDob} style={{ height: 45 }} />
                </Block>

                {/* Gender */}
                <Text style={{ marginTop: 16, marginBottom: 6 }}>Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderDropdown(!showGenderDropdown)}>
                <Block row align="center" justify="space-between" style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, paddingHorizontal: 12, height: 45 }}>
                  <Text color={gender ? '#000' : '#A0A0A0'}>{gender || 'Select Gender'}</Text>
                  <SvgIcon name="arrow-down" size={16} />
                </Block>
              </TouchableOpacity>

              {showGenderDropdown && (
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, marginTop: 6 }}>
                  {genderOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setGender(item);
                        setShowGenderDropdown(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        borderBottomWidth: index !== genderOptions.length - 1 ? 1 : 0,
                        borderBottomColor: '#E6E8EC',
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </Block>
              )}
                
                

                {/* Relationship */}
                <Text style={{ marginTop: 16, marginBottom: 6 }}>Current Relationship</Text>
              <TouchableOpacity onPress={() => setShowRelationshipDropdown(!showRelationshipDropdown)}>
                <Block row align="center" justify="space-between" style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, paddingHorizontal: 12, height: 45 }}>
                  <Text color={relationship ? '#000' : '#A0A0A0'}>{relationship || 'Select Relationship'}</Text>
                  <SvgIcon name="arrow-down" size={16} />
                </Block>
              </TouchableOpacity>

              {showRelationshipDropdown && (
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, marginTop: 6 }}>
                  {relationshipOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setRelationship(item);
                        setShowRelationshipDropdown(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        borderBottomWidth: index !== relationshipOptions.length - 1 ? 1 : 0,
                        borderBottomColor: '#E6E8EC',
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </Block>
              )}
                {/* Interest */}
                <Text style={{ marginTop: 16, marginBottom: 6 }}>Interested In</Text>
              <TouchableOpacity onPress={() => setShowInterestDropdown(!showInterestDropdown)}>
                <Block row align="center" justify="space-between" style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, paddingHorizontal: 12, height: 45 }}>
                  <Text color={interestIn ? '#000' : '#A0A0A0'}>{interestIn || 'Select Interest'}</Text>
                  <SvgIcon name="arrow-down" size={16} />
                </Block>
              </TouchableOpacity>

              {showInterestDropdown && (
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10, marginTop: 6 }}>
                  {interestOptions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setInterestIn(item);
                        setShowInterestDropdown(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        borderBottomWidth: index !== interestOptions.length - 1 ? 1 : 0,
                        borderBottomColor: '#E6E8EC',
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </Block>
              )}

                {/* Extra */}
                <Text style={{ marginTop: 16, marginBottom: 6 }}>My Interest</Text>
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10 }}>
                  <TextInput value={myInterest} onChangeText={setMyInterest} style={{ height: 45, paddingHorizontal: 12 }} />
                </Block>

                <Text style={{ marginTop: 16, marginBottom: 6 }}>Hobbies</Text>
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10 }}>
                  <TextInput value={hobbies} onChangeText={setHobbies} style={{ height: 45, paddingHorizontal: 12 }} />
                </Block>
              </>
            )}

            {activeTab === 'contact' && (
              <>
                <Text style={{ marginTop: 16, marginBottom: 6 }}>Email</Text>
                  <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10 }}>
                    <TextInput value={email} onChangeText={setEmail} style={{ height: 45, paddingHorizontal: 12 }} />

                  </Block>
                

                <Text style={{ marginTop: 16, marginBottom: 6 }}>Phone</Text>
                <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10 }}>
                     <TextInput value={phone} onChangeText={setPhone} style={{ height: 45, paddingHorizontal: 12 }} />

                </Block>
               
              </>
            )}

            {activeTab === 'school' && (
              <>
                <Text style={{ marginTop: 16, marginBottom: 6 }}>School</Text>
                 <Block style={{ borderWidth: 1, borderColor: '#E6E8EC', borderRadius: 10 }}>
                     <TextInput value={school} onChangeText={setSchool} style={{ height: 45, paddingHorizontal: 12 }} />

                 </Block>
               
              </>
            )}

            {/* SAVE */}
            <TouchableOpacity
              onPress={saveChanges}
              style={{
                backgroundColor: palette.blue,
                marginTop: 40,
                padding: 18,
                borderRadius: 25,
                alignItems: 'center'
              }}
            >
              <Text color="#fff">Save Changes</Text>
            </TouchableOpacity>

          </Block>
        </ScrollView>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;