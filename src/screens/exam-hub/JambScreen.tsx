import React, { useRef, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RS } from '@helpers';
import { palette } from '@theme';
import { styles } from './JambStyles';
import { ChessPieces } from '@assets/images';
import { Block, Text, SvgIcon } from '@components';
import { BottomSheet, BottomSheetModalRefProps } from '@components/bottom-sheet';

type PracticeMode = 'jamb' | 'timed' | 'unlimited';

type RootStackParamList = {
  Jamb: undefined;
  PracticeScreen: {
    subjects: string[];
    practiceMode: PracticeMode;
    duration: string;
    includeComprehension: boolean;
    includeNovelQuestions: boolean;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Jamb'>;

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

const JambScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const bottomSheetRef = useRef<BottomSheetModalRefProps>(null);

  const [selectedSubjects, setSelectedSubjects] = useState<(string | null)[]>([
    'english language',
    null,
    null,
    null,
  ]);

  const [activeSubjectIndex, setActiveSubjectIndex] = useState<number | null>(null);
  const [includeComprehension, setIncludeComprehension] = useState(false);
  const [includeNovelQuestions, setIncludeNovelQuestions] = useState(false);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('jamb');
  const [selectedDuration, setSelectedDuration] = useState('150');
  const [searchQuery, setSearchQuery] = useState('');

  const openSubjectSheet = (index: number) => {
    setActiveSubjectIndex(index);
    bottomSheetRef.current?.presentBottomSheet();
  };

  const handleSelectSubject = (subject: string) => {
    if (activeSubjectIndex !== null) {
      const updated = [...selectedSubjects];
      updated[activeSubjectIndex] = subject;
      setSelectedSubjects(updated);
      setActiveSubjectIndex(null);
      bottomSheetRef.current?.dismissBottomSheet();
    }
  };

  const filteredSubjects = SUBJECTS.filter(subject =>
    subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedCount = selectedSubjects.filter(Boolean).length;

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
        <Text style={styles.headerTitle}>JAMB</Text>
      </Block>

      {/* SCROLL CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: RS(140) }]}>
        {/* HEADER TEXT */}
        <Block style={styles.newsCard}>
          <Text style={styles.newsTitle}>
            Prepare for JAMB UTME with a realistic CBT platform that mirrors the official exam environment.
          </Text>
        </Block>

        <Text style={styles.newsSubtitle}>Customize your CBT</Text>
        <Text style={styles.selectModeTitle}>
          Select 3 subjects of your choice and your preferred{'\n'}test mode.
        </Text>

        <Block style={styles.imageTextRow}>
          <Image source={ChessPieces} style={styles.rowImage} resizeMode="contain" />
          <Text style={styles.rowText}>{selectedCount} of 4</Text>
          <Text style={styles.selectedText}>Subjects selected</Text>
        </Block>

        {/* ENGLISH */}
        <Block style={styles.subjectCard}>
          <Text style={styles.subjectTitle}>
            {selectedSubjects[0]?.toLowerCase() === 'english language' ? 'English Language' : selectedSubjects[0]}
          </Text>

          <TouchableOpacity onPress={() => setIncludeComprehension(!includeComprehension)}>
            <Block style={styles.radioRow}>
              <Block style={styles.radioBox}>
                {includeComprehension && <SvgIcon name="check-box" size={18} color={palette.blue} />}
              </Block>
              <Text style={styles.radioText}>Include English comprehension questions</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIncludeNovelQuestions(v => !v)}>
            <Block style={styles.radioRow}>
              <Block style={styles.radioBox}>
                {includeNovelQuestions && <SvgIcon name="check-box" size={18} color={palette.blue} />}
              </Block>
              <Text style={styles.radioText}>Include current JAMB novel questions</Text>
            </Block>
          </TouchableOpacity>
        </Block>

        {/* SUBJECTS 2–4 */}
        {[1, 2, 3].map(index => (
          <Block key={index} style={styles.textFieldContainer}>
            <Block row align="center" style={{ position: 'relative' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => openSubjectSheet(index)}>
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
                  <SvgIcon name="x-check" size={30} />
                </TouchableOpacity>
              )}
            </Block>
          </Block>
        ))}

        {/* PRACTICE MODE */}
        <Block style={styles.practiceDurationCard}>
          <Block row align="center">
            <SvgIcon name="time" size={18} color={palette.blue} />
            <Text style={styles.practiceDurationTitle}>Practice Duration</Text>
          </Block>

          <Block style={styles.modeWrap}>
            {(['jamb', 'timed', 'unlimited'] as PracticeMode[]).map(mode => (
              <TouchableOpacity
                key={mode}
                onPress={() => {
                  setPracticeMode(mode);
                  if (mode === 'jamb') setSelectedDuration('150');
                  if (mode === 'unlimited') setSelectedDuration('unlimited');
                }}
              >
                <Block style={[styles.modeCard, practiceMode === mode && styles.modeCardActive]}>
                  <Text style={styles.modeTitle}>
                    {mode === 'jamb' ? 'JAMB Exam Mode' : mode === 'timed' ? 'Timed Practice' : 'Unlimited Practice'}
                  </Text>
                  <Text style={styles.modeDesc}>
                    {mode === 'jamb' ? '2h 30m • Real UTME experience' : mode === 'timed' ? 'Pick your preferred duration' : 'No time pressure'}
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
                    <Text style={[styles.durationText, active && styles.durationTextActive]}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </Block>
          )}
        </Block>

        <Block style={[styles.proceedWrapper, { paddingBottom: insets.bottom + RS(12) }]}>
          <TouchableOpacity
            disabled={selectedCount < 4}
            onPress={() => {
              navigation.navigate('PracticeScreen', {
                subjects: selectedSubjects
                  .filter(Boolean)
                  .map(s => (s?.toLowerCase() === 'english language' ? 'english' : s!)),
                practiceMode,
                duration: selectedDuration,
                includeComprehension,
                includeNovelQuestions,
              });
            }}
            style={[styles.proceedBtn, selectedCount < 4 && styles.proceedBtnDisabled]}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>

      {/* BOTTOM SHEET */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['70%']}>
        <Block style={{ padding: RS(20) }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: RS(12) }}>Select Subject</Text>

          {/* SEARCH */}
          <Block row align="center" style={{ height: RS(40), borderWidth: 1, borderColor: palette.border2, borderRadius: RS(12), paddingHorizontal: RS(12), marginBottom: RS(12) }}>
            <SvgIcon name="search" size={18} color={palette.grayScale4} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search subjects"
              style={{ flex: 1, marginLeft: RS(8) }}
            />
          </Block>

          {filteredSubjects.map(subject => {
            const isSelected =
              activeSubjectIndex !== null &&
              selectedSubjects[activeSubjectIndex] === subject;

            return (
              <TouchableOpacity
                key={subject}
                onPress={() => handleSelectSubject(subject)}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: RS(12), borderBottomWidth: 1, borderBottomColor: palette.border }}
              >
                <Block style={{ width: RS(18), height: RS(18), borderRadius: RS(9), borderWidth: 1.5, borderColor: palette.blue, alignItems: 'center', justifyContent: 'center', marginRight: RS(12) }}>
                  {isSelected && <Block style={{ width: RS(10), height: RS(10), borderRadius: RS(5), backgroundColor: palette.blue }} />}
                </Block>

                <Text style={{ fontSize: RS(16) }}>{subject}</Text>
              </TouchableOpacity>
            );
          })}
        </Block>
      </BottomSheet>
    </Block>
  );
};

export default JambScreen;
