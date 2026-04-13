





import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { Block, Text } from '@components';
import { palette, family } from '@theme';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RS } from '@helpers';
import { SvgIcon } from '../../components/svg-icon';

import { db, firebaseAuth, FieldValue } from '../../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const tabs = ['Chats', 'Groups', 'Ask Question'];

type Group = {
  id: string;
  title: string;
  membersCount?: number;
  status?: string;
  members?: string[];
};

export default function ChatScreen() {
  const navigation = useNavigation<any>();

  // ✅ HOOKS (top level only)
  const [activeTab, setActiveTab] = useState('Chats');
  const [groups, setGroups] = useState<Group[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  /* ================= FIRESTORE ================= */
  useEffect(() => {
    const unsubscribe = db
      .collection('groups')
      .where('status', '==', 'approved')
      .onSnapshot((snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {

        const list: Group[] = snapshot.docs.map(
          (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({
            id: doc.id,
            ...(doc.data() as Omit<Group, 'id'>),
          })
        );

        setGroups(list);

        const user = firebaseAuth.currentUser;

        if (user) {
          const joined = list
            .filter((g) => g.members?.includes(user.uid))
            .map((g) => g.id);

          setJoinedGroups(joined);
        } else {
          setJoinedGroups([]);
        }

      });

    return () => unsubscribe();
  }, []);

  /* ================= JOIN ================= */
  const handleJoin = async (group: Group) => {
    const user = firebaseAuth.currentUser;

    if (!user) {
      Alert.alert('Error', 'You must be logged in');
      return;
    }

    if (joinedGroups.includes(group.id)) return;

    try {
      const groupRef = db.collection('groups').doc(group.id);

      await groupRef.set(
        {
          members: FieldValue.arrayUnion(user.uid),
          membersCount: FieldValue.increment(1),
        },
        { merge: true }
      );

      Alert.alert('Joined', `You are now a member of ${group.title}`);

      setJoinedGroups((prev) => [...prev, group.id]);
    } catch (error) {
      console.log('JOIN ERROR:', error);
      Alert.alert('Error', 'Could not join group');
    }
  };

  return (
    <Block style={styles.containers}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.white} />

      {/* Header */}
      <Block
        row
        align="center"
        justify="space-between"
        paddingHorizontal={20}
        style={{ marginBottom: 40 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontFamily: family.SemiBold,
            color: palette.black,
          }}
        >
          Chats
        </Text>

        <Block style={{ width: 24 }} />
      </Block>

      {/* Tabs */}
      <Block
        row
        justify="space-between"
        align="flex-end"
        style={{
          borderBottomWidth: 2,
          borderColor: palette.borderLight,
          marginBottom: 20,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              style={{
                flex: 1,
                alignItems: 'center',
                marginLeft: tab === 'Chats' ? -19 : 0,
              }}
              onPress={() => setActiveTab(tab)}
            >
              <Block
                align="center"
                style={{
                  borderBottomWidth: isActive ? 2.5 : 0,
                  borderBottomColor: palette.blue,
                  paddingBottom: 10,
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: isActive ? palette.blue : '#9E9E9E',
                  }}
                >
                  {tab}
                </Text>
              </Block>
            </TouchableOpacity>
          );
        })}
      </Block>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15 }}
      >
        {activeTab === 'Groups' && (
          <>
            <Block
              style={{ marginHorizontal: RS(20), marginBottom: 10 }}
              align="flex-end"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('AllGroupScreen')}
              >
                <Text color={palette.blue} size={13}>
                  See All
                </Text>
              </TouchableOpacity>
            </Block>

            {groups.map((group) => {
              const isJoined = joinedGroups.includes(group.id);

              return (
                <Block
                  key={group.id}
                  style={{
                    marginHorizontal: RS(20),
                    marginBottom: 15,
                    padding: 15,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#eee',
                    backgroundColor: '#fff',
                  }}
                >
                  <Block row align="center" justify="space-between">

                    {/* LEFT SIDE (NAVIGATION) */}
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() =>
  navigation.navigate('GroupDetailScreen', {
    group: group, 
  })
}
                    >
                      <Block row align="center">
                        <Block
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 22,
                            backgroundColor: '#E9F0FF',
                            marginRight: 12,
                          }}
                        />
                        <Block>
                          <Text bold size={15}>
                            {group.title}
                          </Text>
                          <Text size={12} color={palette.grey}>
                            {group.membersCount || 1} Members
                          </Text>
                        </Block>
                      </Block>
                    </TouchableOpacity>

                    {/* JOIN BUTTON */}
                    <TouchableOpacity
                      onPress={() => !isJoined && handleJoin(group)}
                    >
                      <Text color={isJoined ? '#aaa' : palette.blue}>
                        {isJoined ? 'Joined' : 'Join'}
                      </Text>
                    </TouchableOpacity>

                  </Block>
                </Block>
              );
            })}
          </>
        )}

        {/* ASK QUESTION TAB */}
        {activeTab === 'Ask Question' && (
          <>
            <TouchableOpacity>
              <Block
                style={{
                  marginHorizontal: RS(20),
                  marginBottom: 15,
                  padding: 15,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#eee',
                  backgroundColor: '#fff',
                }}
              >
                <Block row align="center">
                  <Block
                    align="center"
                    justify="center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#E9F0FF',
                      marginRight: 12,
                    }}
                  >
                    <Text>?</Text>
                  </Block>

                  <Text bold size={16}>
                    My Questions
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SchoolQuestionScreen')
              }
            >
              <Block
                style={{
                  marginHorizontal: RS(20),
                  marginBottom: RS(15),
                  padding: RS(18),
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: '#eee',
                }}
              >
                <Block row style={{ width: '100%' }}>
                  <Block
                    align="center"
                    justify="center"
                    style={{
                      width: RS(45),
                      height: RS(45),
                      borderRadius: RS(22),
                      backgroundColor: '#EAF5E5',
                      marginRight: RS(15),
                    }}
                  >
                    <SvgIcon name="note" />
                  </Block>

                  <Block flex={1} style={{ flexShrink: 1 }}>
                    <Text bold size={16}>
                      School Based Question
                    </Text>

                    <Text
                      color={palette.grey}
                      size={13}
                      style={{
                        marginTop: 6,
                        flexWrap: 'wrap',
                      }}
                    >
                      Questions posted or answered here pertain
                      to specific schools. You can find responses
                      to inquiries about departments, courses,
                      change of course, school cut-off,
                      admissions, and criteria for admission.
                    </Text>
                  </Block>
                </Block>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity>
              <Block
                style={{
                  marginHorizontal: RS(20),
                  marginBottom: RS(15),
                  padding: RS(18),
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: '#eee',
                }}
              >
                <Block row style={{ width: '100%' }}>
                  <Block
                    align="center"
                    justify="center"
                    style={{
                      width: RS(45),
                      height: RS(45),
                      borderRadius: RS(22),
                      backgroundColor: '#FFF2E2',
                      marginRight: RS(15),
                    }}
                  >
                    <SvgIcon name="note" />
                  </Block>

                  <Block flex={1} style={{ flexShrink: 1 }}>
                    <Text bold size={16}>
                      Academic Based Question
                    </Text>

                    <Text
                      color={palette.grey}
                      size={13}
                      style={{
                        marginTop: 6,
                        flexWrap: 'wrap',
                      }}
                    >
                      Post questions or view solutions related to
                      academic topics like Math, English,
                      Science, Engineering and more.
                    </Text>
                  </Block>
                </Block>
              </Block>
            </TouchableOpacity>
          </>
        )}
        
      </ScrollView>
    </Block>
  );
}