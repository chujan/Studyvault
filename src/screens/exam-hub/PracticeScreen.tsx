import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Block, Text, SvgIcon } from '@components';
import { styles } from './JambStyles';
import { RS } from '@helpers';
import { palette, family } from '@components/theme';
import { fetchJambQuestions } from '../../services';
import { Question } from '../../services/question';
import { getCache, setCache } from '../../storage/index';

/* ================= TYPES ================= */
type PracticeMode = 'jamb' | 'timed' | 'unlimited';
type QuestionReview = {
  subject: string;
  question: string;
  selected: string | null;
  correctAnswer: string;
  options: { label: string; text: string }[];
};
type RootStackParamList = {
  PracticeScreen: {
    subjects: string[];
    practiceMode: PracticeMode;
    duration: string;
    includeComprehension: boolean;
    includeNovelQuestions: boolean;
  };
  PerformanceScreen: PerformanceResult;
};
type PerformanceResult = {
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
export default function PracticeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'PracticeScreen'>>();
  const routeParams = route.params ?? {};
  const subjects: string[] = routeParams.subjects ?? [];
  const practiceMode: PracticeMode = routeParams.practiceMode ?? 'jamb';
  const duration = routeParams.duration;

  /* ===== TOP-LEVEL HOOKS ===== */
  const [startTime] = useState<number>(() => Date.now());
  const [currentSubject, setCurrentSubject] = useState<string>(() => subjects[0] ?? '');
  const [allQuestions, setAllQuestions] = useState<SubjectQuestions>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SubjectAnswers>({});
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

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

  /* ===== FETCH / LOAD QUESTIONS ===== */
  const loadQuestions = async (subject: string) => {
    setLoading(true);
    try {
      const cached = await getCache<Question[]>(`questions_${subject}`);
      if (cached) {
        setAllQuestions(prev => ({ ...prev, [subject]: cached }));
        setQuestions(cached);
        setCurrentQuestionIndex(0);
        setSelectedOptions(prev => ({
          ...prev,
          [subject]: prev[subject] ?? Array(cached.length).fill(null),
        }));
        return;
      }
      const data = await fetchJambQuestions(subject);
      setAllQuestions(prev => ({ ...prev, [subject]: data }));
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setSelectedOptions(prev => ({
        ...prev,
        [subject]: Array(data.length).fill(null),
      }));
      await setCache(`questions_${subject}`, data);
    } catch (e) {
      console.error(e);
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

  const goPrev = () => setCurrentQuestionIndex(i => Math.max(i - 1, 0));
  const goNext = () => setCurrentQuestionIndex(i => Math.min(i + 1, questions.length - 1));
  const currentQuestion = questions[currentQuestionIndex];

  /* ===== CALCULATE RESULTS ===== */
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

    return { totalQuestions, correctCount, percentage, timeSpentInSeconds, totalTimeInSeconds, subjectBreakdown, startTime, endTime: Date.now(), questionReviews };
  };

  /* ===== CALCULATOR HANDLER ===== */
  const handleCalcPress = (btn: string) => {
    if (btn === 'C') setCalcInput('');
    else if (btn === '=') {
      try {
        const result = eval(calcInput);
        setCalcInput(result.toString());
      } catch (e) {
        setCalcInput('Error');
      }
    } else setCalcInput(prev => prev + btn);
  };

  /* ===== LOADING / EMPTY STATES ===== */
  if (loading) {
    return (
      <Block flex={1} align="center" justify="center">
        <ActivityIndicator size="large" color={palette.blue} />
        <Text style={{ marginTop: RS(12) }}>Loading questions...</Text>
      </Block>
    );
  }

  if (!currentQuestion) {
    return (
      <Block flex={1} align="center" justify="center">
        <Text>No questions found</Text>
      </Block>
    );
  }

  /* ===== UI ===== */
  return (
    <Block flex={1}>
      {/* HEADER */}
      <Block style={[styles.header, { marginTop: insets.top }]} paddingHorizontal={RS(20)} paddingVertical={RS(16)} >
        <Block row justify="space-between" align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgIcon name="arrow-left" size={15} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}> {currentSubject.toUpperCase()} CBT </Text>

          {/* Calendar triggers calculator */}
          <TouchableOpacity onPress={() => setShowCalculator(true)}>
            <SvgIcon name="calender" size={16} />
          </TouchableOpacity>
        </Block>

        <Block row justify="space-between" align="center" style={{ marginTop: RS(24) }}>
          <Text style={{ color: '#2FA84F', fontWeight: '600' }}>
            {practiceMode === 'unlimited' ? '∞' : timeLeft !== null ? formatTime(timeLeft) : '00:00:00'}
          </Text>

          <Block row align="center">
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20), borderWidth: 1, borderColor: palette.cardBorder, backgroundColor: '#FFF' , marginRight: RS(17),}}>
              <Text size={14} style={{ fontFamily: family.Medium }} color={palette.blue}> Quit </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowSubmitPopup(true)} style={{ backgroundColor: palette.blue, paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20) }}>
              <Text color="white">Submit</Text>
            </TouchableOpacity>
          </Block>
        </Block>

        {/* SUBJECTS QUEUE */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: RS(16) }} contentContainerStyle={{ paddingHorizontal: RS(4) }} >
          {subjects.map((subj, i) => {
            const isActive = subj === currentSubject;
            return (
              <TouchableOpacity key={i} onPress={() => setCurrentSubject(subj)} style={{ paddingHorizontal: RS(12), paddingVertical: RS(6), backgroundColor: isActive ? palette.blue : '', borderRadius: RS(16), marginRight: RS(8) }} >
                <Text size={14} color={isActive ? 'white' : 'black'}> {subj} </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Block>

      {/* QUESTIONS & OPTIONS */}
      <ScrollView style={{ padding: RS(20) }}>
        <Block style={{ alignSelf: 'flex-start', paddingHorizontal: RS(12), paddingVertical: RS(6), borderRadius: RS(20), backgroundColor: '#E0E0E0', marginBottom: RS(12) }}>
          <Text size={14} style={{ marginBottom: RS(4) }}> Question {currentQuestionIndex + 1} </Text>
        </Block>

        <Text size={15} style={{ marginBottom: RS(16) }}> {currentQuestion.text} </Text>

        {currentQuestion.options.map(opt => {
          const selected = (selectedOptions[currentSubject] ?? [])[currentQuestionIndex] === opt.key;
          return (
            <TouchableOpacity key={opt.key} onPress={() => selectOption(opt.key)} style={{ flexDirection: 'row', alignItems: 'center', padding: RS(14), borderRadius: RS(12), borderWidth: 1, borderColor: selected ? palette.blue : '#ddd', marginBottom: RS(5), backgroundColor: '#fff' }} >
              <Block style={{ width: RS(20), height: RS(20), borderRadius: RS(10), borderWidth: 2, borderColor: palette.blue, alignItems: 'center', justifyContent: 'center', marginRight: RS(12) }} >
                {selected && <Block style={{ width: RS(10), height: RS(10), borderRadius: RS(5), backgroundColor: palette.blue }} />}
              </Block>

              <Text size={14} style={{ marginRight: RS(8), fontWeight: '600' }}> {opt.key}. </Text>
              <Text size={14} style={{ flex: 1 }}> {opt.text} </Text>
            </TouchableOpacity>
          );
        })}

        {/* Question Numbers & Navigation */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: RS(32), marginBottom: RS(16) }} contentContainerStyle={{ paddingHorizontal: RS(4) }}>
          {questions.map((_, i) => {
            const isActive = i === currentQuestionIndex;
            return (
              <TouchableOpacity key={i} onPress={() => setCurrentQuestionIndex(i)} style={{ width: RS(38), height: RS(38), borderRadius: RS(19), alignItems: 'center', justifyContent: 'center', marginRight: RS(10), backgroundColor: isActive ? palette.blue : '#F2F2F2', borderWidth: 1, borderColor: isActive ? palette.blue : '#E0E0E0' }} >
                <Text size={13} color={isActive ? 'white' : 'black'}> {i + 1} </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Block row align="center" justify="space-between" style={{ marginTop: RS(32) }}>
          <TouchableOpacity onPress={goPrev} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20), backgroundColor: palette.blue }}>
            <SvgIcon name="arrow-right" width={24} height={28} color="white" style={{ transform: [{ rotate: '180deg' }], marginRight: RS(8) }} />
            <Text size={14} style={{ fontFamily: family.Medium }} color="white">Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goNext} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RS(16), paddingVertical: RS(8), borderRadius: RS(20), borderWidth: 1, borderColor: palette.cardBorder, backgroundColor: '#FFF' }}>
            <Text size={14} style={{ fontFamily: family.Medium }} color="gray">Next</Text>
            <SvgIcon name="arrow-right" width={24} height={28} color="gray" style={{ marginLeft: RS(8) }} />
          </TouchableOpacity>
        </Block>
      </ScrollView>

      {/* SUBMIT POPUP */}
      {showSubmitPopup && (
        <Block style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
          <Block style={{ width: '85%', backgroundColor: '#FFF', borderRadius: RS(16), padding: RS(20) }}>
            <Text size={16} style={{ fontFamily: family.Medium, marginBottom: RS(12) }}>Submit Test?</Text>
            <Text size={1} style={{ fontFamily: family.Medium, marginBottom: RS(12) }}>Are you sure you want to submit test?</Text>
            <Block row justify="space-between">
              <TouchableOpacity onPress={() => setShowSubmitPopup(false)} style={{ paddingHorizontal: RS(16), paddingVertical: RS(10), borderRadius: RS(20), backgroundColor: '#F2F2F2' }}>
                <Text size={14} style={{ fontFamily: family.Medium }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setShowSubmitPopup(false); const results = calculateResults(); navigation.navigate('PerformanceScreen', results); }} style={{ paddingHorizontal: RS(16), paddingVertical: RS(10), borderRadius: RS(20), backgroundColor: palette.blue }}>
                <Text size={14} style={{ fontFamily: family.Medium }} color="white">Confirm</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      )}

      {/* CALCULATOR MODAL */}
      {showCalculator && (
        <Block style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <Block style={{ width: '90%', backgroundColor: '#fff', borderRadius: RS(16), padding: RS(20) }}>
            <Text size={18} style={{ marginBottom: RS(12) }}>Calculator</Text>

            {/* Display */}
            <Block style={{ height: RS(50), borderWidth: 1, borderColor: '#ddd', borderRadius: RS(8), justifyContent: 'center', paddingHorizontal: RS(12), marginBottom: RS(16) }}>
              <Text size={16}>{calcInput || '0'}</Text>
            </Block>

            {/* Buttons */}
            <Block row wrap="wrap" justify="space-between">
              {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'].map(btn => (
                <TouchableOpacity
                  key={btn}
                  onPress={() => handleCalcPress(btn)}
                  style={{ width: '22%', height: RS(50), marginBottom: RS(12), backgroundColor: '#f2f2f2', alignItems: 'center', justifyContent: 'center', borderRadius: RS(8) }}
                >
                  <Text size={16}>{btn}</Text>
                </TouchableOpacity>
              ))}
            </Block>

            {/* Close Button */}
            <TouchableOpacity onPress={() => setShowCalculator(false)} style={{ marginTop: RS(12), alignSelf: 'center', paddingHorizontal: RS(16), paddingVertical: RS(8), backgroundColor: palette.blue, borderRadius: RS(12) }}>
              <Text color="white">Close</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      )}
    </Block>
  );
}
