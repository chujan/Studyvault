import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import { Block, Text } from '@components';
import { palette } from '@theme';
import { RS } from '@helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { firebaseAuth, db, FieldValue } from '../../config/firebase'; 

const AnswerQuestionScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const question = route?.params?.question;

  const [answer, setAnswer] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [answerCount, setAnswerCount] = useState(question?.answers || 0);
  const [answersList, setAnswersList] = useState<any[]>([]);

  // =========================
  // REALTIME LISTENER FOR ANSWER COUNT
  // =========================
  useEffect(() => {
    if (!question?.id) return;

    const unsubscribe = db
      .collection('questions')
      .doc(question.id)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        if (data?.answers !== undefined) {
          setAnswerCount(data.answers);
        }
      });

    return () => unsubscribe();
  }, [question?.id]);

  // =========================
  // REALTIME LISTENER FOR ANSWERS
  // =========================
  useEffect(() => {
    if (!question?.id) return;

    const unsubscribe = db
      .collection('questions')
      .doc(question.id)
      .collection('answers')
      .onSnapshot(snapshot => {
        const answers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnswersList(answers);
      });

    return () => unsubscribe();
  }, [question?.id]);

  // =========================
  // SUBMIT ANSWER
  // =========================
  const submitAnswer = async () => {
    if (!answer.trim()) return;

    try {
      // Save answer inside subcollection
      await db
        .collection('questions')
        .doc(question.id)
        .collection('answers')
        .add({
          answer,
          image: selectedImage || null,
          userName: 'Anonymous',
           createdAt: FieldValue.serverTimestamp(),
        });

      // Increment answer count
      await db
        .collection('questions')
        .doc(question.id)
        .update({
          answers: FieldValue.increment(1),
        });

      setAnswer('');
      setSelectedImage(null);

      Alert.alert('Success', 'Answer posted successfully');
    } catch (error) {
      console.log('Error posting answer:', error);
    }
  };

  // =========================
  // IMAGE OPTIONS
  // =========================
  const handleImagePress = () => {
    Alert.alert('Select Image', 'Choose an option', [
      { text: 'Take Photo', onPress: openCamera },
      { text: 'Choose from Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets?.[0]?.uri;
      if (uri) setSelectedImage(uri);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets?.[0]?.uri;
      if (uri) setSelectedImage(uri);
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Block flex={1}>
        {/* HEADER */}
        <Block
          row
          style={[
            styles.headeres,
            {
              paddingTop: insets.top + RS(10),
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text size={20}>←</Text>
          </TouchableOpacity>

          <Text bold size={18}>
            Answers ({answerCount})
          </Text>
        </Block>

        {/* CONTENT */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: RS(20) }}
        >
          {/* ANSWERS CARD */}
          <Block style={styles.cards}>
            <Block row style={{ alignItems: 'center' }}>
              <Block style={styles.avatars} />

              <Block style={{ marginLeft: RS(10) }}>
                <Text bold>Asked by {question?.userName}</Text>

                <Text color={palette.borderGreen}>
                  {question?.createdAt?.toDate?.()
                    ?.toLocaleString() || ''}
                </Text>
              </Block>

              <Text style={styles.menu}>•••</Text>
            </Block>

            
            {answersList.length === 0 ? (
              <Text style={styles.answerText}>
                No answers yet. Be the first to answer.
              </Text>
            ) : (
              answersList.map(item => (
                <Block key={item.id} style={{ marginTop: RS(10) }}>
                  <Text bold>{item.userName}</Text>

                  <Text style={styles.answerText}>{item.answer}</Text>

                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: '100%',
                        height: RS(200),
                        borderRadius: 10,
                        marginTop: RS(5),
                      }}
                      resizeMode="cover"
                    />
                  )}
                </Block>
              ))
            )}
          </Block>

          {/* IMAGE PREVIEW */}
          {selectedImage && (
            <Block style={{ paddingHorizontal: RS(15), marginTop: RS(10) }}>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: '100%', height: RS(200), borderRadius: 10 }}
                resizeMode="cover"
              />

              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 25,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                <Text color={palette.white}>✕</Text>
              </TouchableOpacity>
            </Block>
          )}
        </ScrollView>

        {/* INPUT BAR */}
        <Block
          row
          style={[styles.inputBar, { paddingBottom: insets.bottom, alignItems: 'center' }]}
        >
          <TouchableOpacity style={styles.imageBtn} onPress={handleImagePress}>
            <Text size={18}>🖼</Text>
          </TouchableOpacity>

          <Block style={styles.inputWrapper}>
            <TextInput
              placeholder="Write your answer"
              value={answer}
              onChangeText={setAnswer}
              style={styles.input}
            />

            <TouchableOpacity style={styles.sendBtn} onPress={submitAnswer}>
              <Text size={18}>➤</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

export default AnswerQuestionScreen;