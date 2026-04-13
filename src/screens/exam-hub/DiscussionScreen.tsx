/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { palette } from '@theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { firebaseAuth, db, FieldValue } from '../../config/firebase';

const DiscussionItem = ({ name, time, message, likes, dislikes, comments, image }: any) => (
  <Block
    style={{
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#EAEAEA',
    }}
  >
    <Block row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Block row style={{ alignItems: 'center' }}>
        <Block style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E0E0', marginRight: 10 }} />
        <Block>
          <Text semibold>{name}</Text>
          <Text size={12} color="#888">{time}</Text>
        </Block>
      </Block>
      <SvgIcon name="more-horizontal" size={18} />
    </Block>

    {message ? <Text style={{ marginTop: 12 }}>{message}</Text> : null}

    {image && (
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: 150, borderRadius: 10, marginTop: 10 }}
      />
    )}

    <Block row style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 16, borderTopWidth: 1, borderColor: '#F0F0F0', paddingTop: 10 }}>
      <Block row style={{ alignItems: 'center' }}>
        <Block row style={{ alignItems: 'center', marginRight: 16 }}>
          <Text>👍 </Text>
          <Text style={{ marginLeft: 6 }}>{likes || 0}</Text>
        </Block>
        <Block row style={{ alignItems: 'center' }}>
          <Text>👎 </Text>
          <Text style={{ marginLeft: 6 }}>{dislikes || 0}</Text>
        </Block>
      </Block>

      <Block row style={{ alignItems: 'center' }}>
        <SvgIcon name="message-circle" size={18} />
        <Text style={{ marginLeft: 6 }}>{comments || 0}</Text>
      </Block>
    </Block>
  </Block>
);

const DiscussionsScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const eventId = route?.params?.eventId;
  const onNewDiscussion = route?.params?.onNewDiscussion;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!db || !eventId) return;

    const unsubscribe = db
      .collection('discussions')
      .where('eventId', '==', eventId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (!snapshot || !snapshot.docs) return;
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDiscussions(list);
      });

    return () => { if (unsubscribe) unsubscribe(); };
  }, [eventId]);

  const handleSend = async () => {
  if (!message.trim() && !selectedImage) return;
  if (!eventId) {
    Alert.alert('Error', 'Cannot send message: event ID is missing');
    return;
  }

  try {
    const user = firebaseAuth.currentUser;

    // Create a new discussion object locally
    const newDiscussion = {
      eventId,
      name: user?.displayName || 'Anonymous',
      message,
      image: selectedImage || null,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: new Date(), // use JS Date so it’s immediately available
    };

    // Optimistically update UI
    setDiscussions(prev => [newDiscussion, ...prev]);
    setMessage('');
    setSelectedImage(null);

    // Send to Firestore
    await db.collection('discussions').add(newDiscussion);

  } catch (error) {
    console.log('Send error:', error);
  }
};

  const handleImagePress = () => {
    Alert.alert('Select Image', 'Choose an option', [
      { text: 'Take Photo', onPress: openCamera },
      { text: 'Choose from Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
      const uri = response.assets?.[0]?.uri;
      if (uri) setSelectedImage(uri);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      const uri = response.assets?.[0]?.uri;
      if (uri) setSelectedImage(uri);
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: palette.white }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Block flex={1} style={{ backgroundColor: '#F7F7F7', paddingTop: insets.top }}>
        {/* Header */}
        <Block row style={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
          <Block row style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgIcon name="arrow-left" size={15} />
            </TouchableOpacity>

            <Text semibold size={18} style={{ marginLeft: 10 }}>
              Discussions ({discussions.length})
            </Text>
          </Block>

          <Block row style={{ alignItems: 'center', backgroundColor: '#EFEFEF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Text size={12}>Old first</Text>
            <SvgIcon name="arrow-down" size={14} style={{ marginLeft: 4 }} />
          </Block>
        </Block>

        {/* List */}
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
          {discussions.map(item => (
            <DiscussionItem
              key={item.id}
              name={item.name}
              time={item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
              message={item.message}
              likes={item.likes}
              dislikes={item.dislikes}
              comments={item.comments}
              image={item.image}
            />
          ))}
        </ScrollView>

        {/* Bottom Input */}
        <Block style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', paddingBottom: insets.bottom }}>
          {selectedImage && (
            <Block style={{ paddingHorizontal: 16, marginBottom: 8 }}>
              <Image source={{ uri: selectedImage }} style={{ width: 80, height: 80, borderRadius: 10 }} />
            </Block>
          )}

          <Block row style={{ alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10, borderTopWidth: 1, borderColor: '#EAEAEA' }}>
            <TouchableOpacity onPress={handleImagePress}>
              <SvgIcon name="image" size={22} color={palette.blue} />
            </TouchableOpacity>

            <Block row style={{ alignItems: 'center', flex: 1, marginLeft: 10, backgroundColor: '#F5F5F5', borderRadius: 25, paddingHorizontal: 14 }}>
              <TextInput
                placeholder="Write your comment"
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                style={{ flex: 1, paddingVertical: 10 }}
              />

              <TouchableOpacity onPress={handleSend}>
                <SvgIcon name="send" size={18} color={palette.blue} />
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default DiscussionsScreen;