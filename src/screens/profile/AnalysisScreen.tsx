import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block, Text, SvgIcon } from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import { RS } from '@helpers';
import { styles } from './AnalysisStyle';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Analysis'>;
};

const filters = ['All Time', 'This Week', 'This Month', 'This Year'];

const examColors: { [key: string]: string } = {
  WAEC: '#2563EB',
  NECO: '#facc15',
  JAMB: '#22c55e',
  UTME: '#ef4444',
};

export default function AnalysisScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width - RS(40);

  const [selectedExamIndex, setSelectedExamIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All Time');
  const [exams, setExams] = useState([
    { name: 'WAEC', score: 0, rank: 0, total: 0 },
    { name: 'NECO', score: 0, rank: 0, total: 0 },
    { name: 'JAMB', score: 0, rank: 0, total: 0 },
    { name: 'UTME', score: 0, rank: 0, total: 0 },
  ]);
  const [metrics, setMetrics] = useState([
    { label: 'Total Score', value: 0 },
    { label: 'Avg Time', value: 0 },
    { label: 'Improvement', value: 0 },
  ]);
  const [recentTests, setRecentTests] = useState<
    { id: string; title: string; score: number; time: number }[]
  >([]);

  const selectedExam = exams[selectedExamIndex];

  /* ---------------- LOAD EXAMS ---------------- */
  useEffect(() => {
    const loadExams = async () => {
      try {
        const updatedExams = await Promise.all(
          exams.map(async (exam) => {
            const data = await AsyncStorage.getItem(`performance_${exam.name}`);
            if (!data) return exam;

            const parsed = JSON.parse(data);
            return {
              name: exam.name,
              score: Math.round(parsed.percentage || 0),
              rank: 0,
              total: parsed.totalQuestions || 0,
            };
          })
        );
        setExams(updatedExams);
      } catch (e) {
        console.log('Error loading performance:', e);
      }
    };
    loadExams();
  }, []);

  /* ---------------- LOAD METRICS ---------------- */
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await AsyncStorage.getItem(`performance_${selectedExam.name}`);
        if (!data) return;

        const parsed = JSON.parse(data);
        const totalScore = Math.round(parsed.percentage || 0);
        const avgTime = Math.floor((parsed.timeSpentInSeconds || 0) / 60);

        setMetrics([
          { label: 'Total Score', value: totalScore },
          { label: 'Avg Time', value: avgTime },
          { label: 'Improvement', value: 0 },
        ]);
      } catch (e) {
        console.log('Error loading metrics:', e);
      }
    };
    loadMetrics();
  }, [selectedExam]);

  /* ---------------- LOAD RECENT TESTS ---------------- */
  useEffect(() => {
    const loadRecentTests = async () => {
      try {
        const data = await AsyncStorage.getItem(`performance_${selectedExam.name}`);
        if (!data) {
          setRecentTests([]);
          return;
        }

        const parsed = JSON.parse(data);
        const tests = Object.entries(parsed.subjectBreakdown || {}).map(([subject, stats], index) => {
          const s = stats as { total: number; attempted: number; correct: number };
          return {
            id: `${index}`,
            title: `${subject} Test`,
            score: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
            time: Math.floor(Math.random() * 40) + 20,
          };
        });

        setRecentTests(tests);
      } catch (e) {
        console.log('Error loading recent tests:', e);
      }
    };
    loadRecentTests();
  }, [selectedExam]);

  /* ---------------- RENDERERS ---------------- */
  const renderExamItem = ({ item, index }: any) => {
    const isSelected = index === selectedExamIndex;

    const radius = RS(22);
    const strokeWidth = RS(5);
    const circumference = 2 * Math.PI * radius;
    const progress = (item.score / 100) * circumference;

    return (
      <TouchableOpacity
        onPress={() => setSelectedExamIndex(index)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: RS(14),
          marginBottom: RS(12),
          borderRadius: RS(14),
          backgroundColor: isSelected ? '#2563EB' : '#fff',
          borderWidth: RS(1),
          borderColor: '#ccc',
          elevation: 3,
        }}
      >
        <Block row flex={1} align="center">
          <Block style={{ width: '30%' }}>
            <Text
              style={{
                fontSize: RS(15),
                fontWeight: '600',
                color: isSelected ? '#fff' : '#111',
              }}
            >
              {item.name}
            </Text>
          </Block>

          <Block flex={1} align="center">
            <Text
              style={{
                fontSize: RS(14),
                fontWeight: '600',
                color: isSelected ? '#fff' : '#111',
              }}
            >
              Tests taken {item.total}
            </Text>
          </Block>
        </Block>

        {/* % Circle */}
        <Block width={RS(56)} height={RS(56)} justify="center" align="center">
          <Svg width={RS(56)} height={RS(56)}>
            <Circle
              cx={RS(28)}
              cy={RS(28)}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={RS(28)}
              cy={RS(28)}
              r={radius}
              stroke={examColors[item.name] || '#22c55e'}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${progress}, ${circumference}`}
              strokeLinecap="round"
              rotation="-90"
              origin={`${RS(28)}, ${RS(28)}`}
            />
          </Svg>

          <Text
            style={{
              position: 'absolute',
              fontSize: RS(12),
              fontWeight: '700',
              color: isSelected ? '#fff' : '#111',
            }}
          >
            {item.score}%
          </Text>
        </Block>
      </TouchableOpacity>
    );
  };

  const renderTestItem = ({ item }: any) => (
    <Block
      row
      justify="space-between"
      align="center"
      style={{
        padding: RS(12),
        marginBottom: RS(10),
        borderRadius: RS(12),
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: RS(8),
        elevation: 3,
      }}
    >
      <Block>
        <Text style={{ fontSize: RS(14), fontWeight: '600' }}>{item.title}</Text>
        <Text style={{ fontSize: RS(12), color: '#888', marginTop: RS(4) }}>{item.time} mins</Text>
      </Block>
      <Block
        style={{
          paddingVertical: RS(4),
          paddingHorizontal: RS(10),
          borderRadius: RS(8),
          backgroundColor: item.score >= 85 ? '#22c55e' : item.score >= 70 ? '#facc15' : '#ef4444',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>{item.score}%</Text>
      </Block>
    </Block>
  );

  /* ---------------- CHART DATA ---------------- */
  const chartData = {
    labels: recentTests.map((t) => t.title),
    datasets: [
      {
        data: recentTests.map((t) => t.score),
        color: () => examColors[selectedExam.name] || '#22c55e',
        strokeWidth: 2,
      },
    ],
  };

  /* ---------------- SAFETY CHECK ---------------- */
  const hasChartData =
    selectedExam.total > 0 &&
    recentTests.length > 0 &&
    recentTests.some((t) => !isNaN(t.score));

  /* ---------------- UI ---------------- */
  return (
    <Block flex={1} style={styles.container}>
      {/* Header */}
      <Block
        row
        align="center"
        justify="center"
        paddingVertical={RS(16)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Performance</Text>
      </Block>

      <ScrollView style={{ paddingHorizontal: RS(20) }} showsVerticalScrollIndicator={false}>
        {/* Filters */}
        <Block row style={{ marginBottom: RS(30), marginTop: RS(20) }}>
          {filters.map((filter) => {
            const active = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={{
                  paddingVertical: RS(6),
                  paddingHorizontal: RS(14),
                  borderRadius: RS(14),
                  backgroundColor: active ? '#2563EB' : '#e5e7eb',
                  marginRight: RS(10),
                }}
              >
                <Text style={{ color: active ? '#fff' : '#555', fontSize: RS(12) }}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </Block>

        {/* Metrics */}
        <Block
          style={{
            borderWidth: RS(1),
            borderColor: '#ccc',
            borderRadius: RS(12),
            padding: RS(12),
            marginBottom: RS(20),
            backgroundColor: '#fff',
          }}
        >
          <Text fontSize={RS(14)} fontWeight="600" style={{ marginBottom: RS(10) }}>
            General Overview
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {metrics.map((m) => (
              <Block
                key={m.label}
                width={RS(110)}
                height={RS(80)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: RS(12),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: RS(10),
                }}
              >
                <Text fontSize={RS(12)} color="#555">
                  {m.label}
                </Text>
                <Text fontSize={RS(16)} fontWeight="700" style={{ marginTop: RS(6) }}>
                  {m.value} {m.label === 'Avg Time' ? 'mins' : '%'}
                </Text>
              </Block>
            ))}
          </ScrollView>
        </Block>

        {/* Exams */}
        <FlatList data={exams} renderItem={renderExamItem} keyExtractor={(item) => item.name} scrollEnabled={false} />

        {/* Performance Chart */}
        <Block
          style={{
            borderRadius: RS(12),
            paddingVertical: RS(10),
            marginBottom: RS(20),
            backgroundColor: '#fff',
            alignItems: 'center',
          }}
        >
          <Text fontSize={RS(14)} fontWeight="600" style={{ marginBottom: RS(10) }}>
            {selectedExam.name} Performance ({selectedFilter})
          </Text>

          {!hasChartData ? (
            <Block height={RS(180)} justify="center" align="center">
              <Text style={{ color: '#888', fontSize: RS(13) }}>No chart available for this exam</Text>
            </Block>
          ) : (
            <LineChart
              data={chartData}
              width={screenWidth}
              height={RS(180)}
              yAxisSuffix="%"
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: () => examColors[selectedExam.name] || '#22c55e',
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: examColors[selectedExam.name] || '#22c55e',
                },
              }}
              bezier
              style={{ borderRadius: RS(12) }}
            />
          )}
        </Block>

        {/* Recent Tests */}
        <Block
          style={{
            borderRadius: RS(12),
            padding: RS(12),
            marginBottom: RS(20),
            backgroundColor: '#fff',
          }}
        >
          <Text fontSize={RS(14)} fontWeight="600" style={{ marginBottom: RS(10), marginTop: RS(20) }}>
            Recent Tests
          </Text>
          <FlatList data={recentTests} renderItem={renderTestItem} keyExtractor={(item) => item.id} scrollEnabled={false} />
        </Block>
      </ScrollView>
    </Block>
  );
}
