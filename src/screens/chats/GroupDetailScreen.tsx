import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RS } from '@helpers';
import { Block, Text, SvgIcon } from '@components';
import { styles } from './styles';

import { palette } from '@theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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

type RouteParams = {
  group: {
    id: string;
    title: string;
    image?: string;
    membersCount?: number;
    members?: string[];
  };
};

// ================= POST ITEM =================
const PostItem = ({
  post,
  navigation,
  groupId,
  onLike,
  onDislike,
}: {
  post: Post;
  navigation: any;
  groupId: string;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
}) => (
  <Block style={styles.car}>
    <Block style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: post.avatar }} style={styles.avatare} />
        <Block style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.time}>
            {post.createdAt ? post.createdAt.toDate().toLocaleString() : 'Just now'}
          </Text>
        </Block>
      </Block>
      <Text style={styles.menu}>⋯</Text>
    </Block>

    {post.text ? <Text style={styles.postText}>{post.text}</Text> : null}

    {post.image && (
      <Image
        source={{ uri: post.image }}
        style={{ width: '100%', height: RS(200), borderRadius: 10, marginTop: 10 }}
        resizeMode="cover"
      />
    )}

    <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* ONLY CHANGE: wrapped in TouchableOpacity */}
      <TouchableOpacity style={styles.actionBtn} onPress={() => onLike(post.id)}>
        <Text>👍 {post.likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={() => onDislike(post.id)}>
        <Text>👎 {post.dislikes}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() =>
          navigation.navigate('RepliesScreen', {
            postId: post.id,
            groupId: groupId,
            post,
          })
        }
      >
        <Text>💬 {post.comments}</Text>
      </TouchableOpacity>
    </Block>
  </Block>
);

// ================= MAIN SCREEN =================
const GroupScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { group } = route.params;

  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [membersCount, setMembersCount] = useState(group.membersCount || 0);

  // ================= AUTH =================
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(u => setUser(u));
    return () => unsubscribe();
  }, []);

  // ================= GROUP =================
  useEffect(() => {
    const unsubscribe = db.collection('groups').doc(group.id).onSnapshot(snapshot => {
      const data = snapshot.data();
      if (!data) return;
      const members: string[] = data.members || [];
      setMembersCount(members.length);
      setIsJoined(user?.uid ? members.includes(user.uid) : false);
    });
    return () => unsubscribe();
  }, [group.id, user?.uid]);

  // ================= POSTS =================
  useEffect(() => {
    const unsubscribe = db
      .collection('groups')
      .doc(group.id)
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          const list: Post[] = snapshot.docs.map(doc => {
            const data = doc.data() as Omit<Post, 'id'>;
            return { id: doc.id, ...data };
          });
          setPosts(list);
        },
        error => console.log('Firestore error:', error)
      );
    return () => unsubscribe();
  }, [group.id]);

  // ================= LIKE =================
  const handleLike = async (postId: string) => {
    try {
      await db
        .collection('groups')
        .doc(group.id)
        .collection('posts')
        .doc(postId)
        .update({
          likes: FieldValue.increment(1),
        });
    } catch (error) {
      console.log('LIKE ERROR:', error);
    }
  };

  // ================= DISLIKE =================
  const handleDislike = async (postId: string) => {
    try {
      await db
        .collection('groups')
        .doc(group.id)
        .collection('posts')
        .doc(postId)
        .update({
          dislikes: FieldValue.increment(1),
        });
    } catch (error) {
      console.log('DISLIKE ERROR:', error);
    }
  };

  // ================= JOIN =================
  const handleJoin = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in');
      return;
    }
    if (isJoined) return;

    try {
      await db
        .collection('groups')
        .doc(group.id)
        .set({ members: FieldValue.arrayUnion(user.uid) }, { merge: true });

      setIsJoined(true);
      setMembersCount(prev => prev + 1);
    } catch (error) {
      Alert.alert('Error', 'Could not join group');
    }
  };

  // ================= POST =================
  const handlePost = async () => {
    if (!isJoined) {
      Alert.alert('Error', 'You must join the group to post');
      return;
    }
    if (!postText.trim() && !selectedImage) return;

    try {
      await db.collection('groups').doc(group.id).collection('posts').add({
        text: postText || '',
        image: selectedImage || null,
        name: user?.displayName || 'Anonymous',
        avatar: user?.photoURL || 'https://i.pravatar.cc/100?img=5',
        likes: 0,
        dislikes: 0,
        comments: 0,
        userId: user?.uid || null,
        createdAt: FieldValue.serverTimestamp(),
      });
      setPostText('');
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to post');
    }
  };

  // ================= IMAGE =================
  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, res => {
      if (res.didCancel || res.errorCode) return;
      const uri = res.assets?.[0]?.uri;
      if (uri) setSelectedImage(uri);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, res => {
      if (res.didCancel || res.errorCode) return;
      const uri = res.assets?.[0]?.uri;
      if (uri) setSelectedImage(uri);
    });
  };

  const handleImagePress = () => {
    Alert.alert('Select Image', 'Choose an option', [
      { text: 'Take Photo', onPress: openCamera },
      { text: 'Choose from Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Block flex={1} style={{ backgroundColor: '#F7F7F7', paddingTop: insets.top }}>
        {/* HEADER */}
        <Block
          style={[
            styles.head,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgIcon name="arrow-left" size={15} />
          </TouchableOpacity>

          <Block flex={1} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <Image
              source={{ uri: group.image || 'https://i.pravatar.cc/100?img=5' }}
              style={styles.groupImage}
            />
            <Block style={{ marginLeft: 10 }}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <Text style={styles.members}>{membersCount} Member(s)</Text>
            </Block>
          </Block>

          <TouchableOpacity style={styles.joinBtn} onPress={handleJoin}>
            <Text style={styles.joinText}>{isJoined ? 'Joined' : 'Join'}</Text>
          </TouchableOpacity>
        </Block>

        {/* CONTENT */}
        <Block flex={1}>
          <ScrollView
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="always"
  contentContainerStyle={{ paddingBottom: RS(100) }} 
>
            
            {posts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                navigation={navigation}
                groupId={group.id}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            ))}

            {selectedImage && (
              <Block style={{ paddingHorizontal: RS(15), marginTop: RS(10) }}>
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: '100%', height: RS(200), borderRadius: 10 }}
                />
              </Block>
            )}
          </ScrollView>

          {/* INPUT */}
          <Block
            row
            style={[styles.inputBar, { paddingBottom: insets.bottom, alignItems: 'center' }]}
          >
            <TouchableOpacity style={styles.imageBtn} onPress={handleImagePress}>
              <Text size={18}>🖼</Text>
            </TouchableOpacity>
            <Block style={styles.inputWrapper}>
              <TextInput
                placeholder={isJoined ? "Write a post..." : "Join to post"}
                value={postText}
                
                onChangeText={setPostText}
                //editable={isJoined}
                style={{ flex: 1, paddingVertical: 15, color: isJoined ? '#000' : '#aaa' }}
              />
              <TouchableOpacity onPress={handlePost} disabled={!isJoined}>
                <Text size={18} style={{ color: isJoined ? '#000' : '#aaa' }}>➤</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default GroupScreen;