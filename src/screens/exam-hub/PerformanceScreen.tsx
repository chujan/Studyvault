import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Block, Text } from '@components';
import { palette, family } from '@components/theme';
import { styles } from './JambStyles';

type QuestionReview = {
  subject: string;
  question: any;
  selected: string | null;
  correctAnswer: string;
};

type RootStackParamList = {
  ExamHub: undefined;
  OnlineRanking: undefined;
  //ViewPerformanceScreen: undefined;
  PerformanceScreen: {
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    timeSpentInSeconds: number;
    totalTimeInSeconds: number;
    startTime?: number;
    endTime?: number;
    subjectBreakdown: {
      [subject: string]: {
        total: number;
        attempted: number;
        correct: number;
      };
    };
    questionReviews: QuestionReview[];
  };
  ViewPerformanceScreen: {
    questionReviews: QuestionReview[];
    timeSpentInSeconds: number;
  };

  
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PerformanceScreen'
>;

type RoutePropType = RouteProp<RootStackParamList, 'PerformanceScreen'>;



export default function PerformanceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();

  const {
    correctCount = 0,
    totalQuestions = 0,
    percentage = 0,
    timeSpentInSeconds = 0,
    subjectBreakdown = {},
    startTime,
    endTime,
     questionReviews,
  } = route.params ?? {};

  /* ===== TIME SPENT (HOUR & MIN ONLY) ===== */
  const hours = Math.floor(timeSpentInSeconds / 3600);
  const minutes = Math.floor((timeSpentInSeconds % 3600) / 60);

  /* ===== FORMAT START / END TIME ===== */
  const formatClockTime = (timestamp?: number) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const startTimeLabel = formatClockTime(startTime);
  const endTimeLabel = formatClockTime(endTime);

  return (
    <Block flex={1} style={styles.container}>
      {/* ===== HEADER ===== */}
      <Block style={[styles.headers, { marginTop: 90 }]}>
        <Text size={18} weight="bold">
          Examination Performance
        </Text>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ===== MAIN PERFORMANCE ===== */}
        <Block style={styles.section}>
          <Text size={14} color="#7A7A7A">
            You passed {correctCount} of {totalQuestions} questions
          </Text>

          <Text size={56} weight="bold" style={{ marginVertical: 10 }}>
            {Math.round(percentage)}%
          </Text>

          {/* ===== TIME SPENT ===== */}
          <Block style={styles.timeBadge}>
            <Text size={14}>You spent</Text>
          </Block>

          <Block row style={{ marginTop: 10 }}>
            <Text size={22} weight="bold">{hours}</Text>
            <Text size={14} style={styles.timeLabel}> Hour </Text>

            <Text size={22} weight="bold">{minutes}</Text>
            <Text size={14} style={styles.timeLabel}> Min</Text>
          </Block>
        </Block>

        {/* ===== START / END TIME (RESTORED) ===== */}
        <Block style={styles.timeCard}>
          <Text size={14}>
            Start Time:{' '}
            <Text style={{ fontFamily: family.Medium }}>
              {startTimeLabel}
            </Text>
          </Text>

          <Text size={14} style={{ marginTop: 8 }}>
            End Time:{' '}
            <Text style={{ fontFamily: family.Medium }}>
              {endTimeLabel}
            </Text>
          </Text>
        </Block>

        

        {/* ===== SCORE BREAKDOWN ===== */}
        <Block style={styles.scoreCard}>
          <Text size={16} weight="bold">Score breakdown</Text>

          <Text size={13} color="#7A7A7A" style={{ marginTop: 6 }}>
            Below is a breakdown of your scores per subject with the number of
            questions attempted
          </Text>

          {Object.entries(subjectBreakdown).map(([subject, stats]) => {
            const { total, correct } = stats;
            const subjectPercentage =
              total > 0 ? (correct / total) * 100 : 0;

            return (
              <Block style={styles.subjectRow} key={subject}>
                <Block>
                  <Text size={14} weight="medium">{subject}</Text>
                  <Text size={12} color="#7A7A7A">
                    {correct} of {total}
                  </Text>
                </Block>

                <Block style={{ alignItems: 'flex-end' }}>
                  <Text size={14} weight="bold">{correct}</Text>
                  <Text size={12} color="#7A7A7A">
                    {Math.round(subjectPercentage)}%
                  </Text>
                </Block>
              </Block>
            );
          })}
        </Block>

        {/* ===== ACTION BUTTONS ===== */}
        <TouchableOpacity
          style={styles.rankButton}
          onPress={() => navigation.navigate('OnlineRanking')}
        >
          <Text size={16} style={{ fontFamily: family.SemiBold }} color={palette.blue}>
            Send to Online Ranking
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.performanceButton}
  onPress={() =>
    navigation.navigate('ViewPerformanceScreen', {
      questionReviews,
      timeSpentInSeconds,
    })
  }
>
  <Text
    size={16}
    style={{ fontFamily: family.SemiBold }}
    color={palette.white}
  >
    View Performance
  </Text>
</TouchableOpacity>


        <TouchableOpacity
          style={styles.goHomeButton}
          onPress={() => navigation.goBack()}
        >
          <Text size={16} style={{ fontFamily: family.SemiBold }} color={palette.blue}>
            Go Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Block>
  );
}
