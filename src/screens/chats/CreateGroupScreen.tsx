import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@theme';

type DropdownProps = {
  data: string[];
  value: string;
  placeholder: string;
  onSelect: (item: string) => void;
};

const Dropdown = ({ data, value, placeholder, onSelect }: DropdownProps) => {
  const [show, setShow] = useState(false);

  return (
    <Block style={{ marginBottom: RS(20) }}>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Block
          row
          style={{
            marginTop: RS(14),
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 14,
            paddingHorizontal: RS(15),
            paddingVertical: RS(18),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text color={value ? "#000" : "#999"}>
            {value || placeholder}
          </Text>
          <SvgIcon
            name="arrow-down"
            size={14}
            style={{ transform: [{ rotate: show ? "180deg" : "0deg" }] }}
          />
        </Block>
      </TouchableOpacity>

      {show && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: RS(12),
            marginTop: RS(6),
            backgroundColor: "#fff",
            maxHeight: RS(200),
          }}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: RS(12),
                  paddingHorizontal: RS(12),
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
                onPress={() => {
                  onSelect(item);
                  setShow(false);
                }}
              >
                <Text style={{ fontSize: RS(14), color: palette.black }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </Block>
  );
};

const CreateGroupScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [groupType, setGroupType] = useState<'open' | 'closed'>('open');
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [institutionType, setSelectedYearType] = useState('');

  const institution = ['UNIZIK', 'Delsu', 'Fupre', 'Unical', 'Unilag'];

  
  const handleCreateGroup = async () => {
    if (!title || !description || !institutionType) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const user = auth().currentUser;

      if (!user) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      await firestore().collection('groups').add({
        title,
        description,
        institution: institutionType,
        groupType,
        showEmail,
        showPhone,
        createdBy: user.uid,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert(
  'Submitted',
  `${title} has been submitted for approval`,
  [
    {
      text: 'OK',
      onPress: () => navigation.goBack(),
    },
  ]
);

      // Reset form (optional)
      setTitle('');
      setDescription('');
      setSelectedYearType('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <Block
      style={{
        marginTop: insets.top,
        paddingHorizontal: RS(20),
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: RS(40),
        }}
      >
        <Block>

          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Block
              width={40}
              height={40}
              radius={20}
              borderWidth={1}
              borderColor={'#ddd'}
              alignItems="center"
              justifyContent="center"
            >
              <SvgIcon name="arrow-left" size={20} />
            </Block>
          </TouchableOpacity>

          {/* Title */}
          <Text
            style={{
              marginTop: RS(20),
              fontSize: 22,
              fontWeight: '600',
            }}
          >
            Create Group
          </Text>

          {/* Group Icon */}
          <TouchableOpacity>
            <Block
              style={{
                marginTop: RS(25),
                width: 90,
                height: 90,
                borderRadius: 45,
                backgroundColor: '#F1F1F1',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgIcon name="note" size={26} />
            </Block>
          </TouchableOpacity>

          {/* Title */}
          <Text style={{ marginTop: RS(25), fontSize: 16, fontWeight: '500' }}>
            Title
          </Text>

          <Block
            style={{
              marginTop: RS(10),
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 14,
              paddingHorizontal: RS(15),
            }}
          >
            <TextInput
              placeholder="Name your Group"
              value={title}
              onChangeText={setTitle}
              style={{ height: RS(50) }}
            />
          </Block>

          {/* Description */}
          <Text style={{ marginTop: RS(20), fontSize: 16, fontWeight: '500' }}>
            Description
          </Text>

          <Block
            style={{
              marginTop: RS(10),
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 14,
              paddingHorizontal: RS(15),
              paddingVertical: RS(10),
            }}
          >
            <TextInput
              placeholder="What’s the group about?"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              style={{ height: RS(110) }}
            />
          </Block>

          {/* Institution */}
          <Text style={{ marginTop: RS(20), fontSize: 16, fontWeight: '500' }}>
            Target Institution
          </Text>

          <Dropdown
            data={institution}
            value={institutionType}
            placeholder="Select institution"
            onSelect={(item) => setSelectedYearType(item)}
          />

          {/* Group Type */}
          <Text style={{ marginTop: RS(25), fontSize: 16, fontWeight: '600' }}>
            Group Type
          </Text>

          <TouchableOpacity onPress={() => setGroupType('open')}>
            <Block style={{
              marginTop: RS(12),
              borderWidth: 1,
              borderColor: '#eee',
              borderRadius: 14,
              padding: RS(15),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Block style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: palette.grayScale3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {groupType === 'open' && (
                  <Block style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: palette.grayScale2,
                  }} />
                )}
              </Block>

              <Block style={{ marginLeft: RS(12), flex: 1 }}>
                <Text weight="600">Open</Text>
                <Text size={13} color={'#777'}>
                  Users see discussions but must join the group to post
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setGroupType('closed')}>
            <Block style={{
              marginTop: RS(12),
              borderWidth: 1,
              borderColor: '#eee',
              borderRadius: 14,
              padding: RS(15),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Block style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: palette.grayScale3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {groupType === 'closed' && (
                  <Block style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: palette.grayScale2,
                  }} />
                )}
              </Block>

              <Block style={{ marginLeft: RS(12), flex: 1 }}>
                <Text weight="600">Closed</Text>
                <Text size={13} color={'#777'}>
                  Users must join the group to see or post discussions
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>

          {/* Switches */}
          <Block style={{
            marginTop: RS(12),
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 14,
            padding: RS(15),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text size={16}>Show my Email Address</Text>
            <Switch value={showEmail} onValueChange={setShowEmail} />
          </Block>

          <Block style={{
            marginTop: RS(12),
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 14,
            padding: RS(15),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text size={16}>Show my Phone Number</Text>
            <Switch value={showPhone} onValueChange={setShowPhone} />
          </Block>

          {/* Submit */}
          <TouchableOpacity onPress={handleCreateGroup}>
            <Block style={{
              marginTop: RS(40),
              height: 55,
              borderRadius: 30,
              backgroundColor: palette.grayScale3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text color={'#fff'} weight="600">
                Submit
              </Text>
            </Block>
          </TouchableOpacity>

        </Block>
      </ScrollView>
    </Block>
  );
};

export default CreateGroupScreen;