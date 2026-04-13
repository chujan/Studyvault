import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { palette } from '@theme';
import { styles } from './RepliesStyles';
import { RS } from '@helpers';
import { db, firebaseAuth, FieldValue } from '../../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// ================= TYPES =================
type Post = {
  id: string;
  text?: string;
  image?: string | null;
  name: string;
  avatar: string;
  likes: number;
  dislikes: number;
  comments: number;
  userId?: string | null;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

type Reply = {
  id: string;
  message: string;
  image?: string | null;
  name: string;
  avatar: string;
  likes: number;
  dislikes: number;
  userId?: string | null;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

type RouteParams = {
  RepliesScreen: {
    postId: string;
    groupId: string;
    post: Post;
  };
};

// ================= MAIN SCREEN =================
const RepliesScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'RepliesScreen'>>();
  const { postId, groupId, post } = route.params;

  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [answer, setAnswer] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ================= AUTH =================
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(u => setUser(u));
    return () => unsubscribe();
  }, []);

  // ================= FETCH REPLIES =================
  useEffect(() => {
    const unsubscribe = db
      .collection('groups')
      .doc(groupId)
      .collection('posts')
      .doc(postId)
      .collection('replies')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Reply[];
        setReplies(list);
      });

    return () => unsubscribe();
  }, [groupId, postId]);

  // ================= LIKE =================
  const handleLike = async (replyId: string) => {
    try {
      await db
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .collection('replies')
        .doc(replyId)
        .update({
          likes: FieldValue.increment(1),
        });
    } catch (error) {
      console.log('LIKE ERROR:', error);
    }
  };

  // ================= DISLIKE =================
  const handleDislike = async (replyId: string) => {
    try {
      await db
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .collection('replies')
        .doc(replyId)
        .update({
          dislikes: FieldValue.increment(1),
        });
    } catch (error) {
      console.log('DISLIKE ERROR:', error);
    }
  };

  // ================= IMAGE PICKER =================
  const handleImagePress = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Choose Placeholder',
        onPress: () => setSelectedImage('https://via.placeholder.com/300'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // ================= SUBMIT =================
  const submitAnswer = async () => {
    if (!answer.trim() && !selectedImage) return;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to reply');
      return;
    }

    try {
      await db
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .collection('replies')
        .add({
          message: answer,
          image: selectedImage || null,
          name: user.displayName || 'Anonymous',
          avatar: user.photoURL || 'https://i.pravatar.cc/100?img=5',
          likes: 0,
          dislikes: 0,
          createdAt: FieldValue.serverTimestamp(),
          userId: user.uid,
        });

      await db
        .collection('groups')
        .doc(groupId)
        .collection('posts')
        .doc(postId)
        .update({
          comments: FieldValue.increment(1),
        });

      setAnswer('');
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit reply');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Block flex={1} style={{ backgroundColor: palette.white }}>
        {/* HEADER */}
        <Block style={{
          paddingTop: insets.top,
          paddingHorizontal: 16,
          paddingBottom: 10,
          justifyContent: 'center',
          backgroundColor: palette.white,
          alignItems: 'center',
          zIndex: 10,
          elevation: 10,
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: 16,
              top: insets.top + 5,
            }}>
            <SvgIcon name="arrow-left" size={15} />
          </TouchableOpacity>

          <Text style={{
            textAlign: 'center',
            fontSize: 18,
            paddingTop: 10,
            fontFamily: 'Bold',
          }}>
            Replies
          </Text>
        </Block>

        {/* CONTENT */}
        <Block flex={1}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: RS(80) }}
          >
            {/* MAIN POST */}
            <Block style={styles.mainCard}>
              <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: post.avatar }} style={styles.avatar} />
                  <Block style={{ marginLeft: 10 }}>
                    <Text style={styles.name}>{post.name}</Text>
                    <Text style={styles.time}>
                      {post.createdAt ? post.createdAt.toDate().toLocaleString() : 'Just now'}
                    </Text>
                  </Block>
                </Block>
                <TouchableOpacity style={styles.menu}>
                  <Text>•••</Text>
                </TouchableOpacity>
              </Block>

              {post.text && <Text style={styles.message}>{post.text}</Text>}
              {post.image && (
                <Image source={{ uri: post.image }} style={{ width: '100%', height: RS(200), borderRadius: 10 }} />
              )}
            </Block>

            {/* REPLIES */}
            {replies.map(item => (
              <Block key={item.id} style={styles.replyCard}>
                <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.avatar }} style={styles.smallAvatar} />
                    <Text style={styles.replyName}>{item.name}</Text>
                  </Block>
                  <TouchableOpacity style={styles.menu}>
                    <Text>•••</Text>
                  </TouchableOpacity>
                </Block>

                {item.message && <Text style={styles.replyMessage}>{item.message}</Text>}
                {item.image && (
                  <Image source={{ uri: item.image }} style={{ width: '100%', height: RS(150), borderRadius: 10 }} />
                )}

                <Block style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                  <Block style={{ flexDirection: 'row' }}>
                    {/* ONLY CHANGE: TouchableOpacity */}
                    <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(item.id)}>
                      <Text>👍 </Text>
                      <Text style={styles.actionText}>{item.likes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtn, { marginLeft: 10 }]}
                      onPress={() => handleDislike(item.id)}
                    >
                      <Text>👎 </Text>
                      <Text style={[styles.actionText, { color: 'red' }]}>{item.dislikes}</Text>
                    </TouchableOpacity>
                  </Block>

                  <Text style={styles.time}>
                    {item.createdAt ? item.createdAt.toDate().toLocaleString() : 'Just now'}
                  </Text>
                </Block>
              </Block>
            ))}

            {/* IMAGE PREVIEW */}
            {selectedImage && (
              <Block style={{ paddingHorizontal: RS(15), marginTop: RS(10) }}>
                <Image source={{ uri: selectedImage }} style={{ width: '100%', height: RS(200), borderRadius: 10 }} />
              </Block>
            )}
          </ScrollView>

          {/* INPUT */}
          <Block row style={[styles.inputBar, { paddingBottom: insets.bottom }]}>
            <TouchableOpacity style={styles.imageBtn} onPress={handleImagePress}>
              <Text size={18}>🖼</Text>
            </TouchableOpacity>

            <Block style={styles.inputWrapper}>
              <TextInput
                placeholder="Write your answer"
                value={answer}
                onChangeText={setAnswer}
                multiline
                style={[styles.input, { textAlignVertical: 'top', paddingTop: 15 }]}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={submitAnswer}>
                <Text size={18}>➤</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default RepliesScreen;