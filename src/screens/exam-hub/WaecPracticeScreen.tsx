import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Block, Text, SvgIcon } from '@components';
import { styles } from './JambStyles';
import { RS } from '@helpers';
import { palette, family } from '@components/theme';
import { fetchWaecQuestions } from '../../services/jambApi';
import { Question } from '../../services/question';
import { getCache, setCache } from '../../storage/index';
import firestore from '@react-native-firebase/firestore';
import { db, firebaseAuth } from '../../config/firebase';


/* ================= TYPES ================= */
type PracticeMode = 'jamb' | 'timed' | 'unlimited';

type QuestionReview = {
  subject: string;
  question: string;
  selected: string | null;
  correctAnswer: string;
  options: { label: string; text: string }[];
};

type BookmarkedQuestion = {
  examType: 'WAEC';
  subject: string;
  questionIndex: number;
  question: Question;
};

type RootStackParamList = {
  WaecPracticeScreen: {
    subjects: string[];
    practiceMode: PracticeMode;
    duration: string;
    includeComprehension: boolean;
    includeNovelQuestions: boolean;
  };
  PerformanceScreen: PerformanceResult;
};

type PerformanceResult = {
  examType: 'WAEC';
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  timeSpentInSeconds: number;
  totalTimeInSeconds: number;
  subjectBreakdown: { [subject: string]: { total: number; attempted: number; correct: number } };
  questionReviews: QuestionReview[];
};

type SubjectQuestions = Record<string, Question[]>;
type SubjectAnswers = Record<string, (string | null)[]>;

/* ================= SCREEN ================= */
export default function WaecPracticeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WaecPracticeScreen'>>();
  const routeParams = route.params ?? {};
  const subjects: string[] = routeParams.subjects ?? [];
  const practiceMode: PracticeMode = routeParams.practiceMode ?? 'jamb';
  const duration = routeParams.duration;
  const EXAM_TYPE: 'WAEC' = 'WAEC';

  /* ===== TOP-LEVEL HOOKS ===== */
  const [startTime] = useState<number>(() => Date.now());
  const [currentSubject, setCurrentSubject] = useState<string>(() => subjects[0] ?? '');
  const [allQuestions, setAllQuestions] = useState<SubjectQuestions>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SubjectAnswers>({});
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Calculator state
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');

  const initialDurationInSeconds = practiceMode === 'unlimited' ? null : Number(duration) * 60;
  const [timeLeft, setTimeLeft] = useState<number | null>(initialDurationInSeconds);

  /* ===== HANDLE SUBJECTS ARRAY CHANGES SAFELY ===== */
  useEffect(() => {
    if (subjects.length && !subjects.includes(currentSubject)) {
      setCurrentSubject(subjects[0]);
    }
  }, [subjects]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const saved = await getCache<BookmarkedQuestion[]>('waec_bookmarks');
      if (saved) setBookmarks(saved);
      else setBookmarks([]);
    });
    return unsubscribe;
  }, [navigation]);

  /* ===== FETCH / LOAD QUESTIONS ===== */
  const loadQuestions = async (subject: string) => {
    setLoading(true);
    setError(null);

    try {
      // Try cache first
      const cached = await getCache<Question[]>(`waec_questions_${subject}`);
      if (cached && cached.length > 0) {
        setAllQuestions(prev => ({ ...prev, [subject]: cached }));
        setQuestions(cached);
        setCurrentQuestionIndex(0);
        setSelectedOptions(prev => ({
          ...prev,
          [subject]: prev[subject] ?? Array(cached.length).fill(null),
        }));
        return;
      }

      // Fetch from API
      const data = await fetchWaecQuestions(subject);

      if (!data || data.length === 0) {
        setError('No questions available for this subject.');
        setQuestions([]);
        return;
      }

      setAllQuestions(prev => ({ ...prev, [subject]: data }));
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setSelectedOptions(prev => ({
        ...prev,
        [subject]: Array(data.length).fill(null),
      }));

      await setCache(`waec_questions_${subject}`, data);
    } catch (e) {
      // No internet fallback
      const cached = await getCache<Question[]>(`waec_questions_${subject}`);
      if (cached && cached.length > 0) {
        setAllQuestions(prev => ({ ...prev, [subject]: cached }));
        setQuestions(cached);
        setCurrentQuestionIndex(0);
        setSelectedOptions(prev => ({
          ...prev,
          [subject]: prev[subject] ?? Array(cached.length).fill(null),
        }));
      } else {
        setError('No internet connection. Please check your network.');
        setQuestions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentSubject) loadQuestions(currentSubject);
  }, [currentSubject]);

  /* ===== TIMER ===== */
  useEffect(() => {
    if (practiceMode === 'unlimited' || timeLeft === null) return;
    if (timeLeft <= 0) {
      const results = calculateResults();
      navigation.replace('PerformanceScreen', results);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, practiceMode]);

  /* ===== HELPERS ===== */
  const selectOption = (key: string) => {
    setSelectedOptions(prev => {
      const updated = prev[currentSubject] ? [...prev[currentSubject]] : Array(questions.length).fill(null);
      updated[currentQuestionIndex] = key;
      return { ...prev, [currentSubject]: updated };
    });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleBookmark = async () => {
    if (!currentQuestion) return;
    const exists = bookmarks.find(
      b => b.subject === currentSubject && b.questionIndex === currentQuestionIndex
    );

    let updated: BookmarkedQuestion[];
    if (exists) {
      updated = bookmarks.filter(
        b => !(b.subject === currentSubject && b.questionIndex === currentQuestionIndex)
      );
      Alert.alert('Bookmark removed', 'This question has been removed from your bookmarks.', [{ text: 'OK' }]);
    } else {
      const newBookmark: BookmarkedQuestion = {
        examType: 'WAEC',
        subject: currentSubject,
        questionIndex: currentQuestionIndex,
        question: currentQuestion,
      };
      updated = [...bookmarks, newBookmark];
      Alert.alert('Bookmarked successfully', 'You can find this question in your bookmarked questions.', [{ text: 'OK' }]);
    }

    setBookmarks(updated);
    await setCache('waec_bookmarks', updated);
  };

  const goPrev = () => setCurrentQuestionIndex(i => Math.max(i - 1, 0));
  const goNext = () => setCurrentQuestionIndex(i => Math.min(i + 1, questions.length - 1));
  const currentQuestion = questions[currentQuestionIndex];

  const calculateResults = (): PerformanceResult & { startTime: number; endTime: number } => {
    let totalQuestions = 0;
    let correctCount = 0;
    const subjectBreakdown: PerformanceResult['subjectBreakdown'] = {};
    const questionReviews: QuestionReview[] = [];

    subjects.forEach(subject => {
      const subjQuestions = allQuestions[subject] ?? [];
      const subjAnswers = selectedOptions[subject] ?? [];
      totalQuestions += subjQuestions.length;
      let attempted = 0;
      let correct = 0;

      subjQuestions.forEach((q, i) => {
        const selected = subjAnswers[i] ?? null;
        const answer = q.answer?.toString().trim();
        if (selected !== null) attempted += 1;
        if (selected && selected === answer) correct += 1;
        const options = q.options?.map(opt => ({ label: opt.key, text: opt.text })) ?? [];
        questionReviews.push({ subject, question: q.text, selected, correctAnswer: answer ?? '', options });
      });

      correctCount += correct;
      subjectBreakdown[subject] = { total: subjQuestions.length, attempted, correct };
    });

    const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const totalTimeInSeconds = initialDurationInSeconds ?? 0;
    const timeSpentInSeconds = initialDurationInSeconds && timeLeft !== null ? totalTimeInSeconds - timeLeft : 0;

    return { examType: EXAM_TYPE, totalQuestions, correctCount, percentage, timeSpentInSeconds, totalTimeInSeconds, subjectBreakdown, startTime, endTime: Date.now(), questionReviews };
  };

  const handleCalcPress = (btn: string) => {
    if (btn === 'C') setCalcInput('');
    else if (btn === '=') {
      try {
        const result = eval(calcInput);
        setCalcInput(result.toString());
      } catch {
        setCalcInput('Error');
      }
    } else setCalcInput(prev => prev + btn);
  };


  const saveExamHistory = async (results: PerformanceResult) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) return;

    const subjects = Object.keys(results.subjectBreakdown).join(', ');

    await db.collection('examHistory').add({
      userId: user.uid,
      examType: results.examType,
      subjects,
      score: Math.round(results.percentage),
      totalQuestions: results.totalQuestions,
      correctCount: results.correctCount,
      timeSpentInSeconds: results.timeSpentInSeconds,
      createdAt: firestore.FieldValue.serverTimestamp(), 
    });

  } catch (error) {
    console.log('Error saving exam history:', error);
  }
};




  /* ===== LOADING / ERROR / EMPTY QUEUE ===== */
  if (loading) {
    return (
      <Block flex={1} align="center" justify="center">
        <ActivityIndicator size="large" color={palette.blue} />
        <Text style={{ marginTop: RS(12) }}>Loading questions...</Text>
      </Block>
    );
  }

  if (error) {
    return (
      <Block
  flex={1}
  align="center"
  justify="center"
  style={{ padding: RS(20) }}
>
        <Text size={15} style={{ textAlign: 'center', marginBottom: RS(12) }}>
          {error}
        </Text>
        <TouchableOpacity onPress={() => loadQuestions(currentSubject)}>
          <Text color={palette.blue}>Retry</Text>
        </TouchableOpacity>
      </Block>
    );
  }

  if (!loading && questions.length === 0) {
    return (
      <Block flex={1} align="center" justify="center">
        <Text>No questions available</Text>
      </Block>
    );
  }

  /* ===== UI ===== */
  return (
    <Block flex={1}>
      {/* HEADER */}
      <Block style={[styles.header, { marginTop: insets.top }]} paddingHorizontal={RS(20)} paddingVertical={RS(16)}>
        <Block row justify="space-between" align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgIcon name="arrow-left" size={15} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentSubject.toUpperCase()} CBT</Text>
          <Block row align="center">
            <TouchableOpacity onPress={toggleBookmark} style={{ marginRight: RS(15) }}>
              <SvgIcon
                name="book-marks"
                size={20}
                color={bookmarks.some(b => b.subject === currentSubject && b.questionIndex === currentQuestionIndex) ? palette.blue : '#999'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCalculator(true)}>
              <SvgIcon name="calender" size={20} />
            </TouchableOpacity>
          </Block>
        </Block>

        <Block row justify="space-between" align="center" style={{ marginTop: RS(24) }}>
          <Text style={{ color: '#2FA84F', fontWeight: '600' }}>
            {practiceMode === 'unlimited' ? '∞' : timeLeft !== null ? formatTime(timeLeft) : '00:00:00'}
          </Text>

          <Block row align="center">
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: RS(16),
                paddingVertical: RS(8),
                borderRadius: RS(20),
                borderWidth: 1,
                borderColor: palette.cardBorder,
                backgroundColor: '#FFF',
                marginRight: RS(17),
              }}
            >
              <Text size={14} style={{ fontFamily: family.Medium }} color={palette.blue}>
                Quit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowSubmitPopup(true)}
              style={{ backgroundColor: palette.blue, paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20) }}
            >
              <Text color="white">Submit</Text>
            </TouchableOpacity>
          </Block>
        </Block>

        {/* SUBJECTS QUEUE */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: RS(16) }} contentContainerStyle={{ paddingHorizontal: RS(4) }}>
          {subjects.map((subj, i) => {
            const isActive = subj === currentSubject;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setCurrentSubject(subj)}
                style={{ paddingHorizontal: RS(12), paddingVertical: RS(6), backgroundColor: isActive ? palette.blue : '', borderRadius: RS(16), marginRight: RS(8) }}
              >
                <Text size={14} color={isActive ? 'white' : 'black'}>
                  {subj}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Block>

      {/* QUESTIONS & OPTIONS */}
      <ScrollView style={{ padding: RS(20) }}>
        <Block style={{ alignSelf: 'flex-start', paddingHorizontal: RS(12), paddingVertical: RS(6), borderRadius: RS(20), backgroundColor: '#E0E0E0', marginBottom: RS(12) }}>
          <Text size={14} style={{ marginBottom: RS(4) }}>
            Question {currentQuestionIndex + 1}
          </Text>
        </Block>

        <Text size={15} style={{ marginBottom: RS(16) }}>
          {currentQuestion.text}
        </Text>

        {currentQuestion.options.map(opt => {
          const selected = (selectedOptions[currentSubject] ?? [])[currentQuestionIndex] === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              onPress={() => selectOption(opt.key)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: RS(14),
                borderRadius: RS(12),
                borderWidth: 1,
                borderColor: selected ? palette.blue : '#ddd',
                marginBottom: RS(5),
                backgroundColor: '#fff',
              }}
            >
              <Block
                style={{
                  width: RS(20),
                  height: RS(20),
                  borderRadius: RS(10),
                  borderWidth: 2,
                  borderColor: palette.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: RS(12),
                }}
              >
                {selected && <Block style={{ width: RS(10), height: RS(10), borderRadius: RS(5), backgroundColor: palette.blue }} />}
              </Block>

              <Text size={14} style={{ marginRight: RS(8), fontWeight: '600' }}>
                {opt.key}.
              </Text>
              <Text size={14} style={{ flex: 1 }}>
                {opt.text}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Question Numbers & Navigation */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: RS(32), marginBottom: RS(16) }} contentContainerStyle={{ paddingHorizontal: RS(4) }}>
          {questions.map((_, i) => {
            const isActive = i === currentQuestionIndex;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setCurrentQuestionIndex(i)}
                style={{
                  width: RS(38),
                  height: RS(38),
                  borderRadius: RS(19),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: RS(10),
                  backgroundColor: isActive ? palette.blue : '#F2F2F2',
                  borderWidth: 1,
                  borderColor: isActive ? palette.blue : '#E0E0E0',
                }}
              >
                <Text size={13} color={isActive ? 'white' : 'black'}>
                  {i + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Block row align="center" justify="space-between" style={{ marginTop: RS(32) }}>
          <TouchableOpacity onPress={goPrev} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20), backgroundColor: palette.blue }}>
            <SvgIcon name="arrow-right" width={24} height={28} color="white" style={{ transform: [{ rotate: '180deg' }], marginRight: RS(8) }} />
            <Text size={14} style={{ fontFamily: family.Medium }} color="white">
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goNext} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20), borderWidth: 1, borderColor: palette.cardBorder, backgroundColor: '#FFF' }}>
                     <Text size={14} style={{ fontFamily: family.Medium }} color="gray">Next</Text>
                     <SvgIcon name="arrow-right" width={24} height={28} color="gray" style={{ marginLeft: RS(8) }} />
                   </TouchableOpacity>
        </Block>
      </ScrollView>

      {/* SUBMIT POPUP */}
      {showSubmitPopup && (
        <Block style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
          <Block style={{ width: '80%', padding: RS(20), borderRadius: RS(12), backgroundColor: 'white' }}>
            <Text size={16} style={{ fontWeight: '700', marginBottom: RS(12) }}>
              Are you sure you want to submit?
            </Text>
            <Block row justify="space-between">
              <TouchableOpacity
                onPress={() => setShowSubmitPopup(false)}
                style={{ paddingVertical: RS(10), paddingHorizontal: RS(20), borderRadius: RS(8), borderWidth: 1, borderColor: '#ccc' }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
  const results = calculateResults();
  await saveExamHistory(results);
  navigation.replace('PerformanceScreen', results);
}}
                style={{ paddingVertical: RS(10), paddingHorizontal: RS(20), borderRadius: RS(8), backgroundColor: palette.blue }}
              >
                <Text color="white">Submit</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      )}

      {/* CALCULATOR MODAL */}
      {showCalculator && (
        <Block style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: RS(20), borderTopLeftRadius: RS(16), borderTopRightRadius: RS(16) }}>
          <Text size={20} style={{ marginBottom: RS(12) }}>
            Calculator
          </Text>
          <Text size={18} style={{ marginBottom: RS(12), height: RS(36) }}>
            {calcInput}
          </Text>
          <Block row wrap="wrap">
            {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'].map(btn => (
              <TouchableOpacity key={btn} onPress={() => handleCalcPress(btn)} style={{ width: RS(60), height: RS(60), margin: RS(4), borderRadius: RS(12), backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
                <Text size={18}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </Block>
          <TouchableOpacity onPress={() => setShowCalculator(false)} style={{ marginTop: RS(12), alignSelf: 'center' }}>
            <Text color={palette.blue}>Close</Text>
          </TouchableOpacity>
        </Block>
      )}
    </Block>
  );
}
