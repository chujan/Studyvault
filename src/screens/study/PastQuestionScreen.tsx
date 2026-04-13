import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@components/theme';

// ---------- Dropdown component ----------
type DropdownProps = {
  data: string[];
  value: string;
  placeholder: string;
  onSelect: (item: string) => void;
};

const Dropdown = ({ data, value, placeholder, onSelect }: DropdownProps) => {
  const [show, setShow] = useState(false);

  return (
    <Block style={{ marginBottom: RS(20) }}>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Block
          row
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: RS(14),
            paddingHorizontal: RS(16),
            paddingVertical: RS(14),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text color={value ? "#000" : "#999"}>
            {value || placeholder}
          </Text>
          <SvgIcon
            name="arrow-down"
            size={14}
            style={{ transform: [{ rotate: show ? "180deg" : "0deg" }] }}
          />
        </Block>
      </TouchableOpacity>

      {show && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: RS(12),
            marginTop: RS(6),
            backgroundColor: "#fff",
            maxHeight: RS(200),
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: RS(12),
                  paddingHorizontal: RS(12),
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
                onPress={() => {
                  onSelect(item);
                  setShow(false);
                }}
              >
                <Text style={{ fontSize: RS(14), color: palette.black }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </Block>
  );
};

// ---------- Navigation Types ----------
type RootStackParamList = {
  PastQuestionScreen: undefined;
  PastQuestionPracticeScreen: {
    subject: string;
    examType: string;
    year: string;
    questionType: string;
  };
};

type PastQuestionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PastQuestionScreen'
>;

// ---------- Main Screen ----------
export default function PastQuestionScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<PastQuestionScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'questions' | 'videos'>('questions');

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [selectedQuestionType, setSelectedQuestionType] = useState('');
  const [selectedYearType, setSelectedYearType] = useState('');

  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'];
  const examTypes = ['WAEC', 'NECO', 'JAMB'];
  const yearTypes = ['2022', '2023', '2024'];
  const questionTypes = ['Multiple Choice', 'Theory', 'Practical'];

  return (
    <Block flex={1} style={{ backgroundColor: "#F3F3F3" }}>
      {/* HEADER SECTION */}
      <Block
        style={{
          backgroundColor: "#EFE7E3",
          paddingTop: insets.top + RS(10),
          paddingBottom: RS(24),
          paddingHorizontal: RS(20),
        }}
      >
        {/* Top Row */}
        <Block row justify="space-between" align="center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: RS(40),
              height: RS(40),
              borderRadius: RS(20),
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SvgIcon name="arrow-left" size={16} />
          </TouchableOpacity>

          <Block
            style={{
              width: RS(40),
              height: RS(40),
              borderRadius: RS(20),
              backgroundColor: "#FFFFFF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgIcon name="book" size={18} />
          </Block>
        </Block>

        {/* Title */}
        <Block style={{ marginTop: RS(20) }}>
          <Text size={22} weight="bold">
            Study Past Questions
          </Text>
          <Text size={14} color="#777" style={{ marginTop: RS(4) }}>
            Get all exam questions from 1978 till date
          </Text>
        </Block>
      </Block>

      {/* BODY */}
      <ScrollView contentContainerStyle={{ padding: RS(20) }}>
        {/* SEGMENTED CONTROL */}
        <Block
          row
          style={{
            backgroundColor: "#E5E5E5",
            borderRadius: RS(30),
            padding: RS(4),
            marginBottom: RS(24),
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab('questions')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'questions' ? '#FFFFFF' : 'transparent',
              paddingVertical: RS(10),
              borderRadius: RS(25),
              alignItems: 'center',
            }}
          >
            <Text weight={activeTab === 'questions' ? '600' : '400'}>Questions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('videos')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'videos' ? '#FFFFFF' : 'transparent',
              paddingVertical: RS(10),
              borderRadius: RS(25),
              alignItems: 'center',
            }}
          >
            <Text weight={activeTab === 'videos' ? '600' : '400'}>Videos</Text>
          </TouchableOpacity>
        </Block>

        {/* NOT ACTIVATED CARD */}
        <Block
          style={{
            backgroundColor: "#EBF3FF",
            borderRadius: RS(16),
            padding: RS(16),
            marginBottom: RS(24),
          }}
        >
          <Block row justify="space-between" align="center">
            <Block
              style={{
                backgroundColor: "#FFFFFF",
                paddingHorizontal: RS(12),
                paddingVertical: RS(6),
                borderRadius: RS(20),
              }}
            >
              <Text size={12} weight="600">
                Not Activated
              </Text>
            </Block>

            <SvgIcon name="arrow-right" size={24} />
          </Block>

          <Text lineHeight={20} style={{ marginTop: RS(12) }}>
            You are limited to only 2 years of past questions. Activate your
            app to unlock other years from 1978 till date
          </Text>
        </Block>

        {/* SUBJECT */}
        <Block style={{ marginBottom: RS(2) }}>
          <Text weight="600" style={{ marginBottom: RS(8) }}>
            Subject
          </Text>
          <Dropdown
            data={subjects}
            value={selectedSubject}
            placeholder="Select Subject"
            onSelect={setSelectedSubject}
          />
        </Block>

        {/* EXAMINATION TYPE */}
        <Block style={{ marginBottom: RS(2) }}>
          <Text weight="600" style={{ marginBottom: RS(8) }}>
            Examination Type
          </Text>
          <Dropdown
            data={examTypes}
            value={selectedExamType}
            placeholder="Select Examination Type"
            onSelect={setSelectedExamType}
          />
        </Block>

        {/* YEAR TYPE */}
        <Block style={{ marginBottom: RS(2) }}>
          <Text weight="600" style={{ marginBottom: RS(8) }}>
            Examination Year
          </Text>
          <Dropdown
            data={yearTypes}
            value={selectedYearType}
            placeholder="Select Examination Year"
            onSelect={setSelectedYearType}
          />
        </Block>

        {/* QUESTION TYPE */}
        <Block style={{ marginBottom: RS(10) }}>
          <Text weight="600" style={{ marginBottom: RS(8) }}>
            Question Type
          </Text>
          <Dropdown
            data={questionTypes}
            value={selectedQuestionType}
            placeholder="Select Question Type"
            onSelect={setSelectedQuestionType}
          />
        </Block>

        {/* START BUTTON */}
        <TouchableOpacity
          onPress={() => {
            if (!selectedSubject || !selectedExamType || !selectedYearType || !selectedQuestionType) {
              console.log('Please select all fields');
              return;
            }
            navigation.navigate('PastQuestionPracticeScreen', {
              subject: selectedSubject,
              examType: selectedExamType,
              year: selectedYearType,
              questionType: selectedQuestionType,
            });
          }}
          style={{
            marginTop: RS(20),
            borderRadius: RS(20),
            backgroundColor: '#007BFF',
            paddingVertical: RS(16),
            alignItems: 'center',
          }}
        >
          <Text size={16} weight="600" color="#FFFFFF">
            Start
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Block>
  );
}
