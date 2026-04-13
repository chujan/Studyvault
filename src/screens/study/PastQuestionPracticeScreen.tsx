import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';

export default function PastQuestionPracticeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();

  const { subject, examType, year, questionType } = route.params as {
    subject: string;
    examType: string;
    year: string;
    questionType: string;
  };

  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
  };

  const correctAnswer = "5/2";

  const explanation = `
Using quadratic formulas:

α + β = -b/a = -5/3
αβ = c/a = -2/3

1/α + 1/β = (α + β) / (αβ)

= (-5/3) ÷ (-2/3)
= (-5/3) × (3/-2)
= 5/2
`;

  const options = ["-5/3", "-2/3", "5/2", "2/5"];

  return (
    <Block flex={1} style={{ backgroundColor: "#F7F7F7" }}>
      
      {/* HEADER */}
      <Block
        row
        align="center"
        justify="center"
        style={{
          paddingTop: insets.top + RS(10),
          paddingBottom: RS(12),
          paddingHorizontal: RS(20),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: RS(20),
            width: RS(40),
            height: RS(40),
            borderRadius: RS(20),
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgIcon name="arrow-left" size={18} />
        </TouchableOpacity>

        <Text weight="600" size={16}>
          Past Questions
        </Text>
      </Block>

      <ScrollView contentContainerStyle={{ padding: RS(20), paddingBottom: RS(120) }}>

        {/* NOT ACTIVATED CARD */}
        <Block
          style={{
            backgroundColor: "#FCE8E6",
            borderRadius: RS(16),
            padding: RS(16),
            marginBottom: RS(24),
            borderWidth: 1,
            borderColor: "#F5C2C0",
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

            <SvgIcon name="arrow-right" size={18} />
          </Block>

          <Text
            size={13}
            color="#B3261E"
            style={{ marginTop: RS(12), lineHeight: RS(20) }}
          >
            You are limited to only 2 years of past questions. Activate your
            app to unlock other years from 1978 till date
          </Text>
        </Block>

        {/* SUBJECT */}
        <Text size={20} weight="700" style={{ marginBottom: RS(14) }}>
          {subject}
        </Text>

        {/* FILTER PILLS */}
        <Block row style={{ marginBottom: RS(20) }}>
          <Block
            style={{
              backgroundColor: "#E6F4F1",
              paddingHorizontal: RS(14),
              paddingVertical: RS(8),
              borderRadius: RS(20),
              marginRight: RS(10),
            }}
          >
            <Text size={12} weight="600" color="#00796B">
              Questions Type  {questionType}
            </Text>
          </Block>

          <Block
            style={{
              backgroundColor: "#F3E5D8",
              paddingHorizontal: RS(14),
              paddingVertical: RS(8),
              borderRadius: RS(20),
            }}
          >
            <Text size={12} weight="600" color="#9C5700">
              Exam Type  {examType}
            </Text>
          </Block>
        </Block>

        {/* SEARCH BAR */}
        <Block
          row
          align="center"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: RS(16),
            paddingHorizontal: RS(16),
            paddingVertical: RS(14),
            marginBottom: RS(20),
            borderWidth: 1,
            borderColor: "#E5E5E5",
          }}
        >
          <SvgIcon name="search" size={18} />
          <TextInput
            placeholder="Search Question"
            placeholderTextColor="#999"
            style={{ flex: 1, marginLeft: RS(10) }}
          />
        </Block>

        {/* QUESTION CARD */}
        <Block
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: RS(18),
            padding: RS(18),
            elevation: 3,
          }}
        >
          <Block
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#F4F4F4",
              paddingHorizontal: RS(12),
              paddingVertical: RS(6),
              borderRadius: RS(20),
              marginBottom: RS(12),
            }}
          >
            <Text size={12} weight="600">
              Question 1
            </Text>
          </Block>

          <Text size={14} style={{ lineHeight: RS(22), marginBottom: RS(16) }}>
            If α and β are the roots of the equation 3x² + 5x − 2 = 0, find the value of 1/α + 1/β
          </Text>

          {/* OPTIONS */}
          {options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === correctAnswer;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOption(option)}
                style={{
                  borderWidth: 1,
                  borderColor: isSelected
                    ? isCorrect
                      ? "#4CAF50"
                      : "#E53935"
                    : "#E5E5E5",
                  backgroundColor: isSelected
                    ? isCorrect
                      ? "#E8F5E9"
                      : "#FFEBEE"
                    : "#FFFFFF",
                  borderRadius: RS(14),
                  padding: RS(14),
                  marginBottom: RS(10),
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </Block>

        {/* EXPLANATION BUTTON */}
        <TouchableOpacity
          onPress={toggleExplanation}
          style={{
            marginTop: RS(18),
            backgroundColor: "#EEF4FF",
            paddingVertical: RS(14),
            borderRadius: RS(14),
            alignItems: "center",
          }}
        >
          <Text weight="600" color="#2F6BFF">
            {showExplanation ? "Hide Explanation" : "View Explanation"}
          </Text>
        </TouchableOpacity>

        {/* EXPLANATION CONTENT */}
        {showExplanation && (
          <Block
            style={{
              marginTop: RS(14),
              backgroundColor: "#F9FAFB",
              padding: RS(16),
              borderRadius: RS(16),
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text weight="600" style={{ marginBottom: RS(8) }}>
              Correct Answer: {correctAnswer}
            </Text>

            <Text style={{ lineHeight: RS(22) }}>
              {explanation}
            </Text>
          </Block>
        )}

      </ScrollView>

      {/* BOTTOM FLOATING SHEET */}
      

    </Block>
  );
}
