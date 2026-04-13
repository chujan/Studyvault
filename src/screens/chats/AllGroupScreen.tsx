import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { RS } from '@helpers';
import { styles } from './AllGroupStyle';
import { Block, Text, SvgIcon } from '@components';

import { db, firebaseAuth, FieldValue } from '../../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type Group = {
  id: string;
  title: string;
  membersCount?: number;
  status?: string;
  members?: string[]; 
};

const AllGroupScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState('');
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]); // track joined groups locally

  
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

        // Track which groups the current user has joined
        const user = firebaseAuth.currentUser;
        if (user) {
          const joined = list
            .filter((g) => g.members?.includes(user.uid))
            .map((g) => g.id);
          setJoinedGroups(joined);
        }
      });

    return () => unsubscribe();
  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredGroups = groups.filter((group) =>
    group.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= JOIN GROUP ================= */
  const handleJoin = async (group: Group) => {
  const user = firebaseAuth.currentUser;

  if (!user) {
    Alert.alert('Error', 'You must be logged in to join a group');
    return;
  }

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
    <Block flex={1} style={styles.container}>

      {/* HEADER */}
      <Block
        row
        align="center"
        justify="space-between"
        paddingHorizontal={RS(20)}
        paddingVertical={RS(16)}
        style={{ marginTop: insets.top }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateGroupScreen')}
        >
          <Text style={styles.createText}>Create Group</Text>
        </TouchableOpacity>
      </Block>

      {/* SEARCH */}
      <Block
        row
        align="center"
        paddingHorizontal={RS(20)}
        style={{ marginBottom: RS(15) }}
      >
        <Block row align="center" flex={1} style={styles.searchInput}>
          <SvgIcon name="search" size={16} />
          <TextInput
            placeholder="Search Group"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </Block>

        <TouchableOpacity style={styles.filterButton}>
          <SvgIcon name="note" size={16} color="#fff" />
        </TouchableOpacity>
      </Block>

      {/* GROUP LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: RS(140) },
        ]}
      >
        {filteredGroups.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No groups found
          </Text>
        ) : (
          filteredGroups.map((item) => {
            const isJoined = joinedGroups.includes(item.id);

            return (
              <Block key={item.id} row align="center" style={styles.groupCard}>
                <Block style={styles.avatar} />

                <Block flex={1} style={{ marginLeft: RS(12) }}>
                  <Text style={styles.groupTitle}>{item.title}</Text>
                  <Text style={styles.memberText}>
                    {item.membersCount || 0} Members
                  </Text>
                </Block>

                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    { backgroundColor: isJoined ? '#aaa' : '#007BFF' },
                  ]}
                  onPress={() => !isJoined && handleJoin(item)}
                >
                  <Text style={styles.joinText}>
                    {isJoined ? 'Joined' : 'Join'}
                  </Text>
                </TouchableOpacity>
              </Block>
            );
          })
        )}
      </ScrollView>
    </Block>
  );
};

export default AllGroupScreen;