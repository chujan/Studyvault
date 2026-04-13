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
import { styles } from './JambStyles';
import { Block, Text, SvgIcon } from '@components';
import { BottomSheet, BottomSheetModalRefProps } from '@components/bottom-sheet';
type PracticeMode = 'timed' | 'unlimited';

/* ================= TYPES ================= */
type RootStackParamList = {
  UtmePracticeScreen: {
    institution: string;
    faculty: string;
    subject: string;
    year: string;
    practiceMode?: PracticeMode;
    duration?: number;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* ================= DATA ================= */
const INSTITUTIONS = ['UNILAG', 'UNIBEN', 'UNN', 'LASU', 'UNIPORT', 'UNIZIK'];

const FACULTIES: Record<string, string[]> = {
  UNILAG: ['Science', 'Arts', 'Engineering'],
  UNIBEN: ['Science', 'Social Science'],
  UNN: ['Arts', 'Law'],
  LASU: ['Science', 'Management'],
  UNIPORT: ['Science', 'Management'],
  UNIZIK:['Science', 'Social Science', 'Arts', 'Engineering']
};

const SUBJECTS = ['English', 'Mathematics', 'Physics', 'Chemistry'];


const YEARS = ['2005/2006', '2006/2007', '2014/2015'];

const FACULTY_SUBJECTS: Record<string, string[]> = {
  Science: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
  Arts: ['English', 'Literature', 'History'],
  'Social Science': ['Economics', 'Government', 'Geography', 'Commerce'],
  Engineering: ['Physics', 'Mathematics', 'Computer Science'],
  Law: ['Government', 'Civic Education'],
  Management: ['Economics', 'Accounting', 'Business Studies', 'English'],
};

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
const UtmeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const bottomSheetRef = useRef<BottomSheetModalRefProps>(null);

  /* ================= STATE ================= */
  const [institution, setInstitution] = useState<string | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('timed');
    const [selectedDuration, setSelectedDuration] = useState('150');
  

  const [activeField, setActiveField] = useState<
    'institution' | 'faculty' | 'subject' | 'year' | null
  >(null);

  /* ================= HANDLERS ================= */
  const openSheet = (field: typeof activeField) => {
    setActiveField(field);
    bottomSheetRef.current?.presentBottomSheet();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.dismissBottomSheet();
  };

  const canProceed = institution && faculty && subject && year;
  
  

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
        <Text style={styles.headerTitle}>UTME</Text>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: RS(140) }]}
      >
        {/* INTRO */}
        <Block style={styles.newsCard}>
          <Text style={styles.newsTitle}>
            Prepare for UTME with a realistic CBT platform tailored to your needs.
          </Text>
        </Block>

        {/* ================= INSTITUTION ================= */}
        <Text style={styles.selectModeTitle}>Select Institution</Text>

        <Block style={styles.textFieldContainer}>
          <TouchableOpacity onPress={() => openSheet('institution')}>
            <TextInput
              editable={false}
              pointerEvents="none"
              style={styles.textField}
              placeholder="Select institution"
              placeholderTextColor={palette.grayScale4}
              value={institution ?? ''}
            />
          </TouchableOpacity>
        </Block>

        {/* ================= FACULTY ================= */}
        {institution && (
          <>
            <Text style={styles.selectModeTitle}>Select Faculty</Text>

            <Block style={styles.textFieldContainer}>
              <TouchableOpacity onPress={() => openSheet('faculty')}>
                <TextInput
                  editable={false}
                  pointerEvents="none"
                  style={styles.textField}
                  placeholder="Select faculty"
                  placeholderTextColor={palette.grayScale4}
                  value={faculty ?? ''}
                />
              </TouchableOpacity>
            </Block>
          </>
        )}

        {/* ================= SUBJECT ================= */}
        {faculty && (
          <>
            <Text style={styles.selectModeTitle}>Select Subject</Text>

            <Block style={styles.textFieldContainer}>
              <TouchableOpacity onPress={() => openSheet('subject')}>
                <TextInput
                  editable={false}
                  pointerEvents="none"
                  style={styles.textField}
                  placeholder="Select subject"
                  placeholderTextColor={palette.grayScale4}
                  value={subject ?? ''}
                />
              </TouchableOpacity>
            </Block>
          </>
        )}

        {/* ================= YEAR ================= */}
        {subject && (
          <>
            <Text style={styles.selectModeTitle}>Select Year</Text>

            <Block style={styles.textFieldContainer}>
              <TouchableOpacity onPress={() => openSheet('year')}>
                <TextInput
                  editable={false}
                  pointerEvents="none"
                  style={styles.textField}
                  placeholder="Select year"
                  placeholderTextColor={palette.grayScale4}
                  value={year ?? ''}
                />
              </TouchableOpacity>
            </Block>
          </>
        )}
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



        {/* ================= PROCEED ================= */}
        <Block style={[styles.proceedWrapper, { paddingBottom: insets.bottom }]}>
          <TouchableOpacity
            disabled={!canProceed}
            style={[
              styles.proceedBtn,
              !canProceed && styles.proceedBtnDisabled,
            ]}
            onPress={() =>
  navigation.navigate('UtmePracticeScreen', {
    institution: institution!,
    faculty: faculty!,
    subject: subject!,
    year: year!,
    practiceMode,
    duration:
      practiceMode === 'timed'
        ? Number(selectedDuration)
        : undefined,
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
    {(() => {
      switch (activeField) {
        case 'institution':
          return INSTITUTIONS.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setInstitution(item);
                setFaculty(null);
                setSubject(null);
                setYear(null);
                closeSheet();
              }}
              style={styles.sheetItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ));
        case 'faculty':
          return FACULTIES[institution!]?.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setFaculty(item);
                setSubject(null);
                setYear(null);
                closeSheet();
              }}
              style={styles.sheetItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ));
       case 'subject':
  return FACULTY_SUBJECTS[faculty!]!.map(item => (
    <TouchableOpacity
      key={item}
      onPress={() => {
        setSubject(item);
        setYear(null);
        closeSheet();
      }}
      style={styles.sheetItem}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  ));

        case 'year':
          return YEARS.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setYear(item);
                closeSheet();
              }}
              style={styles.sheetItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ));
        default:
          return null;
      }
    })()}
  </Block>
</BottomSheet>
 
      
    </Block>
  );
};

export default UtmeScreen;