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

/* ================= TYPES ================= */
type RootStackParamList = {
  UtmePracticeScreen: {
    institution: string;
    faculty: string;
    subject: string;
    year: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* ================= DATA ================= */
const INSTITUTIONS = ['UNILAG', 'UNIBEN', 'UNN', 'LASU', 'UNIPORT'];

const FACULTIES: Record<string, string[]> = {
  UNILAG: ['Science', 'Arts', 'Engineering'],
  UNIBEN: ['Science', 'Social Science'],
  UNN: ['Arts', 'Law'],
  LASU: ['Science', 'Management'],
  UNIPORT: ['Science', 'Management'],
};

const SUBJECTS = ['English', 'Mathematics', 'Physics', 'Chemistry'];


const YEARS = ['2005/2006'];

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
        <Text style={styles.headerTitle}>NECO</Text>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: RS(140) }]}
      >
        {/* INTRO */}
        <Block style={styles.newsCard}>
          <Text style={styles.newsTitle}>
            Prepare for NECO with a realistic CBT platform tailored to your needs.
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
          return SUBJECTS.map(item => (
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