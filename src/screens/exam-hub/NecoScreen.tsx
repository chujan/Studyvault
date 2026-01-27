import React, { useRef, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RS } from '@helpers';
import { palette } from '@theme';
import { styles } from './JambStyles'; // you can rename later
import { Block, Text, SvgIcon } from '@components';
import { BottomSheet, BottomSheetModalRefProps } from '@components/bottom-sheet';

/* ================= TYPES ================= */
type PracticeMode = 'timed' | 'unlimited';

type RootStackParamList = {
  NecoPracticeScreen: {
    subjects: string[];
    practiceMode: PracticeMode;
    duration: string;
    includeComprehension: boolean;
    includeNovelQuestions: boolean;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* ================= DATA ================= */
const SUBJECTS = [
  'english language',
  'mathematics',
  'biology',
  'chemistry',
  'physics',
  'government',
  'economics',
  'literature',
];

const DURATIONS = [
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '1h 30m', value: '90' },
  { label: '2h', value: '120' },
  { label: '2h 30m', value: '150' },
  { label: '3h', value: '180' },
];

/* ================= COMPONENT ================= */
const NecoScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const bottomSheetRef = useRef<BottomSheetModalRefProps>(null);

  /* ================= STATE ================= */
  const [subjectCount, setSubjectCount] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<(string | null)[]>([]);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('timed');
  const [selectedDuration, setSelectedDuration] = useState('150');
  const [includeComprehension, setIncludeComprehension] = useState(false);
  const [includeNovelQuestions, setIncludeNovelQuestions] = useState(false);

  /* ================= HANDLERS ================= */
  const openNumberSheet = () => {
    setActiveSubjectIndex(null);
    bottomSheetRef.current?.presentBottomSheet();
  };

  const openSubjectSheet = (index: number) => {
    setActiveSubjectIndex(index);
    bottomSheetRef.current?.presentBottomSheet();
  };

  const handleSelectSubject = (subject: string) => {
    if (activeSubjectIndex === null) return;

    const updated = [...selectedSubjects];
    updated[activeSubjectIndex] = subject;
    setSelectedSubjects(updated);

    setSearchQuery('');
    setActiveSubjectIndex(null);
    bottomSheetRef.current?.dismissBottomSheet();
  };

  const filteredSubjects = SUBJECTS.filter(subject =>
    subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = selectedSubjects.filter(Boolean).length;

  /* ================= UI ================= */
  return (
    <Block flex={1} style={styles.container}>
      {/* HEADER */}
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
        <Text style={styles.headerTitle}>NECO</Text>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: RS(140) }]}
      >
        {/* INTRO */}
        <Block style={styles.newsCard}>
          <Text style={styles.newsTitle}>
            Prepare for Neco with a realistic CBT platform tailored to your needs.
          </Text>
        </Block>

        <Text style={styles.newsSubtitle}>Customize your CBT</Text>
        <Text style={styles.selectModeTitle}>
          Select your subjects and practice mode.
        </Text>

      
        <Block style={styles.textFieldContainer}>
          <TouchableOpacity onPress={openNumberSheet}>
            <TextInput
              editable={false}
              pointerEvents="none"
              style={styles.textField}
              placeholder="Select number of subjects"
              placeholderTextColor={palette.grayScale4}
              value={subjectCount ? `${subjectCount} subjects` : ''}
            />
          </TouchableOpacity>
        </Block>

        
        {subjectCount !== null &&
          selectedSubjects.map((_, index) => (
            <Block key={index} style={styles.textFieldContainer}>
              <Block row align="center" style={{ position: 'relative' }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => openSubjectSheet(index)}
                >
                  <TextInput
                    editable={false}
                    pointerEvents="none"
                    style={styles.textField}
                    placeholder={`Select subject ${index + 1}`}
                    placeholderTextColor={palette.grayScale4}
                    value={selectedSubjects[index] ?? ''}
                  />
                </TouchableOpacity>

                {selectedSubjects[index] && (
                  <TouchableOpacity
                    onPress={() => {
                      const updated = [...selectedSubjects];
                      updated[index] = null;
                      setSelectedSubjects(updated);
                    }}
                    style={{ position: 'absolute', right: RS(12) }}
                  >
                    <SvgIcon name="x-check" size={28} />
                  </TouchableOpacity>
                )}
              </Block>
            </Block>
          ))}

        
        <Block style={styles.practiceDurationCard}>
          <Block row align="center">
            <SvgIcon name="time" size={18} color={palette.blue} />
            <Text style={styles.practiceDurationTitle}>Practice Duration</Text>
          </Block>

          <Block style={styles.modeWrap}>
            {(['timed', 'unlimited'] as PracticeMode[]).map(mode => (
              <TouchableOpacity
                key={mode}
                onPress={() => {
                  setPracticeMode(mode);
                  if (mode === 'unlimited') setSelectedDuration('unlimited');
                }}
              >
                <Block style={[styles.modeCard, practiceMode === mode && styles.modeCardActive]}>
                  <Text style={styles.modeTitle}>
                    {mode === 'timed' ? 'Timed Practice' : 'Unlimited Practice'}
                  </Text>
                  <Text style={styles.modeDesc}>
                    {mode === 'timed'
                      ? 'Pick your preferred duration'
                      : 'No time pressure'}
                  </Text>
                </Block>
              </TouchableOpacity>
            ))}
          </Block>

          {practiceMode === 'timed' && (
            <Block style={styles.durationWrap}>
              {DURATIONS.map(item => {
                const active = selectedDuration === item.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => setSelectedDuration(item.value)}
                    style={[styles.durationBtn, active && styles.durationBtnActive]}
                  >
                    <Text style={[styles.durationText, active && styles.durationTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Block>
          )}
        </Block>

      
        <Block style={[styles.proceedWrapper, { paddingBottom: insets.bottom }]}>
          <TouchableOpacity
            disabled={selectedCount !== subjectCount}
            style={[
              styles.proceedBtn,
              selectedCount !== subjectCount && styles.proceedBtnDisabled,
            ]}
            onPress={() =>
              navigation.navigate('NecoPracticeScreen', {
                subjects: selectedSubjects
                  .filter(Boolean)
                  .map(s => (s?.toLowerCase() === 'english language' ? 'english' : s!)),
                practiceMode,
                duration: selectedDuration,
                includeComprehension,
                includeNovelQuestions,
              })
            }
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>

      {/* ================= BOTTOM SHEET ================= */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['60%']}>
        <Block style={{ padding: RS(20) }}>
          {activeSubjectIndex === null ? (
            <>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: RS(16) }}>
                Select number of subjects
              </Text>

              {[2, 4].map(num => (
                <TouchableOpacity
                  key={num}
                  onPress={() => {
                    setSubjectCount(num);
                    setSelectedSubjects(Array(num).fill(null));
                    setSearchQuery('');
                    bottomSheetRef.current?.dismissBottomSheet();
                  }}
                  style={{
                    paddingVertical: RS(16),
                    borderBottomWidth: 1,
                    borderBottomColor: palette.border,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{num} Subjects</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: RS(12) }}>
                Select Subject
              </Text>

              <Block
                row
                align="center"
                style={{
                  height: RS(40),
                  borderWidth: 1,
                  borderColor: palette.border2,
                  borderRadius: RS(12),
                  paddingHorizontal: RS(12),
                  marginBottom: RS(12),
                }}
              >
                <SvgIcon name="search" size={18} color={palette.grayScale4} />
                <TextInput
                  value={searchQuery}
                  onChangeText={text => setSearchQuery(text ?? '')}
                  placeholder="Search subjects"
                  style={{ flex: 1, marginLeft: RS(8) }}
                />
              </Block>

              {filteredSubjects.map(subject => (
                <TouchableOpacity
                  key={subject}
                  onPress={() => handleSelectSubject(subject)}
                  style={{
                    paddingVertical: RS(14),
                    borderBottomWidth: 1,
                    borderBottomColor: palette.border,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </Block>
      </BottomSheet>
    </Block>
  );
};

export default NecoScreen;
