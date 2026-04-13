import React, { useState } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Block, Text, SvgIcon } from '@components';
import { styles } from './FlashCardStyles';
import { palette } from '@theme';
import { RS } from '@helpers';

import {
  fetchJambQuestions,
  fetchWaecQuestions,
  fetchNecoQuestions,
} from '../../services/jambApi';

import { Question } from '../../services/question';

/* -------------------- TYPES -------------------- */
export type FlashStackParamList = {
  FlashCardScreen: undefined;
  FlashStudyScreen: {
    exam: string;
    subject: string;
    questions: Question[];
  };
};

type NavigationProp = NativeStackNavigationProp<
  FlashStackParamList,
  'FlashCardScreen'
>;

/* -------------------- DATA -------------------- */
const examTypes = ['WAEC', 'NECO', 'JAMB'];
const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'];

/* -------------------- DROPDOWN -------------------- */
function Dropdown({
  data,
  value,
  placeholder,
  onSelect,
}: {
  data: string[];
  value: string;
  placeholder: string;
  onSelect: (item: string) => void;
}) {
  const [show, setShow] = useState(false); 

  return (
    <Block style={styles.textFieldContainer}>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <TextInput
          editable={false}
          pointerEvents="none"
          style={styles.textField}
          placeholder={placeholder}
          placeholderTextColor={palette.grayScale4}
          value={value}
        />
      </TouchableOpacity>

      {show && (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: RS(12),
            marginTop: RS(6),
            backgroundColor: '#fff',
            maxHeight: RS(200),
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: RS(12),
                  paddingHorizontal: RS(12),
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
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
}

/* -------------------- FLASHCARD SCREEN -------------------- */
export default function FlashCardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  // ---------------- STATE ----------------
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // ---------------- LOAD QUESTIONS ----------------
  const loadQuestions = async () => {
    if (!selectedExam || !selectedSubject) return;

    setLoading(true);
    setIsGenerated(false);

    try {
      let data: Question[] = [];

      switch (selectedExam) {
        case 'JAMB':
          data = await fetchJambQuestions(selectedSubject);
          break;
        case 'WAEC':
          data = await fetchWaecQuestions(selectedSubject);
          break;
        case 'NECO':
          data = await fetchNecoQuestions(selectedSubject);
          break;
      }

      setQuestions(data);
      setIsGenerated(true);
    } catch (e) {
      console.log('QUESTION LOAD ERROR:', e);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <Block flex={1} style={styles.container}>
      {/* HEADER */}
      <Block
        row
        align="center"
        justify="center"
        paddingVertical={16}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>FlashCard</Text>
      </Block>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RS(160),
          paddingHorizontal: RS(16),
        }}
      >
        {/* Intro */}
        <Block style={styles.newsCard}>
          <Text style={styles.newsTitle}>
            Prepare smarter with focused flashcards tailored to your exam.
          </Text>
        </Block>

        {/* Exam Type */}
        <Text style={styles.selectModeTitle}>Select Exam Type</Text>
        <Dropdown
          data={examTypes}
          value={selectedExam}
          placeholder="Select exam type"
          onSelect={setSelectedExam}
        />

        {/* Subject */}
        <Text style={[styles.selectModeTitle, { marginTop: RS(20) }]}>
          Select Subject
        </Text>
        <Dropdown
          data={subjects}
          value={selectedSubject}
          placeholder="Select subject"
          onSelect={setSelectedSubject}
        />

        {/* Generate Button */}
        {selectedExam && selectedSubject && !isGenerated && (
          <TouchableOpacity
            style={{
              marginTop: RS(30),
              backgroundColor: palette.green,
              paddingVertical: RS(16),
              borderRadius: RS(14),
              alignItems: 'center',
            }}
            onPress={loadQuestions}
            disabled={loading}
          >
            <Text
              style={{ color: '#fff', fontSize: RS(16), fontWeight: '600' }}
            >
              {loading ? 'Loading Questions…' : 'Generate Flashcards'}
            </Text>
          </TouchableOpacity>
        )}

        {/* PREVIEW */}
        {isGenerated && questions.length > 0 && (
          <Block
            style={{
              marginTop: RS(28),
              backgroundColor: '#fff',
              borderRadius: RS(16),
              padding: RS(16),
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: RS(15),
                fontWeight: '600',
                marginBottom: RS(12),
              }}
            >
              Generated Questions ({questions.length})
            </Text>

            {questions.slice(0, 3).map((q, i) => (
              <Block
                key={q.id ?? i}
                style={{
                  backgroundColor: palette.gray,
                  padding: RS(12),
                  borderRadius: RS(10),
                  marginBottom: RS(10),
                }}
              >
                <Text>{q.text}</Text>
              </Block>
            ))}

            {questions.length > 3 && (
              <Text style={{ fontSize: RS(13), color: palette.grayScale4 }}>
                … and {questions.length - 3} more questions
              </Text>
            )}
          </Block>
        )}

        {/* START STUDY */}
        {isGenerated && questions.length > 0 && (
          <TouchableOpacity
            style={{
              marginTop: RS(24),
              backgroundColor: palette.blue,
              paddingVertical: RS(18),
              borderRadius: RS(16),
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.navigate('FlashStudyScreen', {
                exam: selectedExam,
                subject: selectedSubject,
                questions,
              })
            }
          >
            <Text
              style={{ color: '#fff', fontSize: RS(16), fontWeight: '600' }}
            >
              Start Studying
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Block>
  );
}
