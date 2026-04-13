import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { palette, family } from '@theme';
import { styles as homeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getCache } from '../../storage';
import { RS } from '@helpers';
import { styles } from './ViewPerformanceStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ================= TYPES ================= */
type QuestionOption = {
  key: string;
  text: string;
};

type Question = {
  text: string;
  options: QuestionOption[];
  answer: string;
  explanation?: string;
};

type BookmarkedQuestion = {
  examType: 'WAEC' | 'UTME' | 'POST_UTME';
  subject: string;
  questionIndex: number;
  question: Question;
};

const tabs = ['UTME', 'WAEC', 'Post UTME'];
const H_PADDING = RS(20);

/* ================= SCREEN ================= */
export default function BookmarkedScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<'WAEC' | 'UTME' | 'Post UTME'>('WAEC');
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  /* ===== LOAD BOOKMARKS ===== */
  useEffect(() => {
    const load = async () => {
      const cacheKey =
        activeTab === 'WAEC'
          ? 'waec_bookmarks'
          : activeTab === 'UTME'
          ? 'utme_bookmarks'
          : 'post_utme_bookmarks';

      const saved = await getCache<BookmarkedQuestion[]>(cacheKey);
      setBookmarks(saved ?? []);
    };

    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation, activeTab]);

  /* ===== FILTER BY TAB ===== */
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(b => {
      if (activeTab === 'WAEC') return b.examType === 'WAEC';
      if (activeTab === 'UTME') return b.examType === 'UTME';
      if (activeTab === 'Post UTME') return b.examType === 'POST_UTME';
      return false;
    });
  }, [bookmarks, activeTab]);

  /* ===== SUBJECT QUEUE ===== */
  const subjects = useMemo(() => {
    return [...new Set(filteredBookmarks.map(b => b.subject))];
  }, [filteredBookmarks]);

  /* ===== SYNC CURRENT SUBJECT ===== */
  useEffect(() => {
    if (subjects.length && !subjects.includes(currentSubject)) {
      setCurrentSubject(subjects[0]);
      setCurrentQuestionIndex(0);
      setShowExplanation(false);
    }
  }, [subjects, currentSubject]);

  /* ===== QUESTIONS FOR SUBJECT ===== */
  const subjectQuestions = useMemo(
    () => filteredBookmarks.filter(b => b.subject === currentSubject),
    [filteredBookmarks, currentSubject]
  );

  const currentQuestion = subjectQuestions[currentQuestionIndex]?.question;

  const toggleExplanation = () => setShowExplanation(prev => !prev);

  /* ================= UI ================= */
  return (
    <Block style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.white} />

      {/* ===== HEADER ===== */}
      <Block
        row
        align="center"
        justify="space-between"
        paddingHorizontal={20}
        style={{ paddingTop: insets.top, marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontFamily: family.SemiBold }}>
          Bookmarked Questions
        </Text>

        <Block style={{ width: 24 }} />
      </Block>

      {/* ===== TABS ===== */}
      <Block row style={{ borderBottomWidth: 2, borderColor: palette.borderLight }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => {
                setActiveTab(tab as any);
                setCurrentQuestionIndex(0);
                setShowExplanation(false);
              }}
            >
              <Block
                style={{
                  borderBottomWidth: isActive ? 2.5 : 0,
                  borderBottomColor: palette.blue,
                  paddingBottom: 10,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: isActive ? palette.blue : '#9E9E9E' }}>
                  {tab}
                </Text>
              </Block>
            </TouchableOpacity>
          );
        })}
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== SUBJECT PILLS ===== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: H_PADDING,
            paddingVertical: RS(20),
          }}
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
                style={[
                  styles.subjectPill,
                  isActive && styles.activePill,
                  { minHeight: RS(32) },
                ]}
              >
                <Text style={isActive ? styles.activeSubjectText : styles.subjectText}>
                  {subject}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ===== QUESTION CARD ===== */}
        {currentQuestion ? (
          <Block style={[styles.card, { marginHorizontal: H_PADDING, marginTop: RS(20) }]}>
            <Block style={styles.questionTag}>
              <Text style={styles.questionTagText}>
                Question {currentQuestionIndex + 1}
              </Text>
            </Block>

            <Text style={styles.questionText}>{currentQuestion.text}</Text>

            {/* OPTIONS */}
            {currentQuestion.options.map(opt => {
              const status =
                opt.key === currentQuestion.answer ? 'correct' : undefined;

              return (
                <ReviewRadioOption
                  key={opt.key}
                  label={opt.key}
                  text={opt.text}
                  status={status}
                />
              );
            })}

            {/* EXPLANATION & TRASH */}
            <Block row align="center" justify="space-between" style={{ marginTop: RS(18) }}>
              <TouchableOpacity style={styles.bookMarkBtn} onPress={toggleExplanation}>
                <Text style={styles.explainText}>
                  {showExplanation ? 'Hide Explanation' : 'View Explanation'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Delete Question',
                    'Are you sure you want to delete this bookmarked question?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
                          const updatedBookmarks = bookmarks.filter(
                            b =>
                              !(
                                b.examType === filteredBookmarks[currentQuestionIndex].examType &&
                                b.subject === filteredBookmarks[currentQuestionIndex].subject &&
                                b.questionIndex === filteredBookmarks[currentQuestionIndex].questionIndex
                              )
                          );

                          setBookmarks(updatedBookmarks);

                          const cacheKey =
                            activeTab === 'WAEC'
                              ? 'waec_bookmarks'
                              : activeTab === 'UTME'
                              ? 'utme_bookmarks'
                              : 'post_utme_bookmarks';
                          await AsyncStorage.setItem(cacheKey, JSON.stringify(updatedBookmarks));

                          if (currentQuestionIndex >= updatedBookmarks.length) {
                            setCurrentQuestionIndex(
                              updatedBookmarks.length - 1 >= 0 ? updatedBookmarks.length - 1 : 0
                            );
                          }
                        },
                      },
                    ]
                  );
                }}
              >
                <SvgIcon name="trash" size={24} color={palette.red} />
              </TouchableOpacity>
            </Block>

            {showExplanation && (
              <Block style={styles.explanationContainer}>
                <Text style={styles.explanationText}>
                  Correct answer is{' '}
                  <Text style={{ fontFamily: family.Medium }}>
                    {currentQuestion.answer}
                  </Text>
                  {'\n'}
                  {currentQuestion.explanation ?? 'No explanation available'}
                </Text>
              </Block>
            )}
          </Block>
        ) : (
          <Block flex={1} align="center" justify="center" style={{ marginTop: RS(40) }}>
            <Text>No bookmarked questions</Text>
          </Block>
        )}

        {/* ===== QUESTION NUMBERS ===== */}
        {currentQuestion && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: H_PADDING,
              paddingVertical: RS(20),
              marginTop: RS(30),
            }}
          >
            {subjectQuestions.map((_, i) => {
              const isActive = i === currentQuestionIndex;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setCurrentQuestionIndex(i);
                    setShowExplanation(false);
                  }}
                  style={[styles.pageBox, isActive && styles.activePage]}
                >
                  <Text style={isActive ? styles.activePageText : styles.pageText}>
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </ScrollView>
    </Block>
  );
}

/* ================= OPTION ================= */
function ReviewRadioOption({
  label,
  text,
  status,
}: {
  label: string;
  text: string;
  status?: 'correct';
}) {
  const borderColor = status === 'correct' ? '#2FA84F' : '#DDD';

  return (
    <Block row align="center" style={[styles.optionRow, { borderColor }]}>
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
        {status && (
          <Block
            style={{
              width: RS(10),
              height: RS(10),
              borderRadius: RS(5),
              backgroundColor: '#2FA84F',
            }}
          />
        )}
      </Block>

      <Text size={14} style={{ flex: 1 }}>
        {label}. {text}
      </Text>

      {status && <SvgIcon name="check" size={20} />}
    </Block>
  );
}
