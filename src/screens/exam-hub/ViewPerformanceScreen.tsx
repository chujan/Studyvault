import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import rawExplanations from '../explanations.json';
import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './ViewPerformanceStyles';
import { family } from '@components/theme';

/* ================= TYPES ================= */

type QuestionOption = {
  label: string;
  text: string;
};

type QuestionReview = {
  id: number;
  subject: string;
  question: string;
  selected: string | null;
  correctAnswer: string;
  options: QuestionOption[];
};

type QuestionReviewWithUI = QuestionReview & {
  showExplanation: boolean;
  explanation?: string;
};

interface Explanations {
  [id: number]: string;
}

type RootStackParamList = {
  ViewPerformanceScreen: {
    questionReviews: QuestionReview[];
    timeSpentInSeconds: number;
  };
};

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'ViewPerformanceScreen'
>;

type RoutePropType = RouteProp<
  RootStackParamList,
  'ViewPerformanceScreen'
>;

const H_PADDING = RS(20);

/* ================= IMPORT EXPLANATIONS ================= */

import explanationsJson from '../explanations.json';

/* ================= SCREEN ================= */

export default function ViewPerformanceScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();
  const explanationsJson = rawExplanations as Record<number, string>;

  const initialQuestions: QuestionReviewWithUI[] =
    (route.params?.questionReviews ?? []).map(q => ({
      ...q,
      showExplanation: false,
      explanation: explanationsJson[q.id] ?? "No explanation available."
    }));

  const [questionData, setQuestionData] = useState<QuestionReviewWithUI[]>(initialQuestions);

  const subjects = Array.from(new Set(questionData.map(q => q.subject)));
  const [currentSubject, setCurrentSubject] = useState(subjects[0] ?? '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const filteredQuestions = questionData.filter(q => q.subject === currentSubject);
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  if (!currentQuestion) return null;

  const toggleExplanation = () => {
    setQuestionData(prev =>
      prev.map(q =>
        q === currentQuestion
          ? { ...q, showExplanation: !q.showExplanation }
          : q
      )
    );
  };

  return (
    <Block flex={1} style={styles.container}>
      {/* ===== HEADER ===== */}
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
        <Text style={styles.headerTitle}>JAMB REVIEW</Text>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== SUBJECT TABS ===== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingVertical: RS(10) }}
        >
          {subjects.map(subject => {
            const isActive = subject === currentSubject;
            return (
              <TouchableOpacity
                key={subject}
                onPress={() => {
                  setCurrentSubject(subject);
                  setCurrentQuestionIndex(0);
                }}
                style={[styles.subjectPill, isActive && styles.activePill]}
              >
                <Text style={isActive ? styles.activeSubjectText : styles.subjectText}>
                  {subject}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ===== QUESTION CARD ===== */}
        <Block style={[styles.card, { marginHorizontal: H_PADDING, marginTop: RS(20) }]}>
          <Block style={styles.questionTag}>
            <Text style={styles.questionTagText}>Question {currentQuestionIndex + 1}</Text>
          </Block>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* ===== OPTIONS ===== */}
          {currentQuestion.options.map(option => {
            const status =
              option.label === currentQuestion.correctAnswer
                ? 'correct'
                : option.label === currentQuestion.selected
                ? 'wrong'
                : undefined;

            return (
              <ReviewRadioOption
                key={option.label}
                label={option.label}
                text={option.text}
                status={status}
              />
            );
          })}

          {/* ===== EXPLANATION ===== */}
          <TouchableOpacity style={styles.explainBtn} onPress={toggleExplanation}>
            <Text style={styles.explainText}>
              {currentQuestion.showExplanation ? 'Hide Explanation' : 'View Explanation'}
            </Text>
          </TouchableOpacity>

          {currentQuestion.showExplanation && (
            <Block style={styles.explanationContainer}>
              <Text style={styles.explanationText}>
                Correct answer is{' '}
                <Text style={{ fontFamily: family.Medium }}>{currentQuestion.correctAnswer}</Text>
                {'\n'}
                {currentQuestion.explanation}
              </Text>
            </Block>
          )}
        </Block>

        {/* ===== QUESTION NUMBERS ===== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingVertical: RS(20), marginTop: RS(30) }}
        >
          {filteredQuestions.map((_, i) => {
            const isActive = i === currentQuestionIndex;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setCurrentQuestionIndex(i)}
                style={[styles.pageBox, isActive && styles.activePage]}
              >
                <Text style={isActive ? styles.activePageText : styles.pageText}>{i + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>
    </Block>
  );
}

/* ================= OPTION COMPONENT ================= */

function ReviewRadioOption({
  label,
  text,
  status,
}: {
  label: string;
  text: string;
  status?: 'correct' | 'wrong';
}) {
  const borderColor =
    status === 'correct' ? '#2FA84F' : status === 'wrong' ? '#E53935' : '#DDD';
  const fillColor =
    status === 'correct' ? '#2FA84F' : status === 'wrong' ? '#E53935' : 'transparent';

  return (
    <Block
      row
      align="center"
      style={[styles.optionRow, { borderColor, backgroundColor: '#FFF' }]}
    >
      {/* RADIO */}
      <Block
        style={{
          width: RS(20),
          height: RS(20),
          borderRadius: RS(10),
          borderWidth: 2,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: RS(12),
        }}
      >
        {status && <Block style={{ width: RS(10), height: RS(10), borderRadius: RS(5), backgroundColor: fillColor }} />}
      </Block>

      {/* TEXT */}
      <Text size={14} style={{ flex: 1 }}>
        {label}. {text}
      </Text>

      {/* CHECK / X */}
      {status && <SvgIcon name={status === 'correct' ? 'check' : 'x'} size={status === 'wrong' ? 34 : 20} />}
    </Block>
  );
}
