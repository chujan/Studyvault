import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';
import { palette } from '@components/theme';
import { fetchNovelById, Novel } from '../../services/novelService';

type RouteParams = {
  NovelPastQuestionScreen: {
    novelId: string;
  };
};

export default function NovelPastQuestionScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'NovelPastQuestionScreen'>>();

  const { novelId } = route.params;

  const [novel, setNovel] = useState<Novel | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const loadNovel = async () => {
      const data = await fetchNovelById(novelId);
      setNovel(data);
    };

    loadNovel();
  }, [novelId]);

  const questions = novel?.past_questions?.questions ?? [];
  const hasQuestions = questions.length > 0;
  const currentQuestion = questions[currentQuestionIndex] ?? null;

  return (
    <Block flex={1} style={{ backgroundColor: '#F5F5F5' }}>
      {/* HEADER */}
      <Block
        style={[styles.header, { marginTop: insets.top }]}
        paddingHorizontal={RS(20)}
        paddingVertical={RS(16)}
      >
        <Block row justify="space-between" align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgIcon name="arrow-left" size={15} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {novel?.title ?? 'Loading...'} CBT
          </Text>

          <Block width={RS(20)} />
        </Block>

        {/* Timer & Submit (only show if questions exist) */}
       {/* Timer & Submit (only show if questions exist) */}
{hasQuestions && (
  <Block
    row
    justify="flex-end"  // align buttons to the right
    align="center"
    style={{ marginTop: RS(24) }}
  >
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        paddingHorizontal: RS(16),
        paddingVertical: RS(8),
        borderRadius: RS(20),
        borderWidth: 1,
        borderColor: palette.cardBorder,
        backgroundColor: '#FFF',
        marginRight: RS(12),
      }}
    >
      <Text color={palette.blue}>Quit</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        backgroundColor: palette.blue,
        paddingHorizontal: RS(16),
        paddingVertical: RS(8),
        borderRadius: RS(20),
      }}
    >
      <Text color="white">Submit</Text>
    </TouchableOpacity>
  </Block>
)}

      </Block>

      {/* CONTENT */}
      {!novel ? (
        <Block flex={1} align="center" justify="center">
          <Text>Loading...</Text>
        </Block>
      ) : !hasQuestions ? (
        <Block flex={1} align="center" justify="center">
          <Text>No past questions available for this novel.</Text>
        </Block>
      ) : (
        <ScrollView style={{ padding: RS(20) }}>
          {/* Question Badge */}
          <Block
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: RS(12),
              paddingVertical: RS(6),
              borderRadius: RS(20),
              backgroundColor: '#E0E0E0',
              marginBottom: RS(12),
            }}
          >
            <Text size={14}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
          </Block>

          {/* Question Text */}
          <Text size={15} style={{ marginBottom: RS(16) }}>
            {currentQuestion?.question}
          </Text>

          {/* OPTIONS */}
          {Object.entries(currentQuestion?.options ?? {}).map(([key, text]) => {
            const selected = selectedOption === key;

            return (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedOption(key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: RS(14),
                  borderRadius: RS(12),
                  borderWidth: 1,
                  borderColor: selected ? palette.blue : '#ddd',
                  marginBottom: RS(8),
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
                  {selected && (
                    <Block
                      style={{
                        width: RS(10),
                        height: RS(10),
                        borderRadius: RS(5),
                        backgroundColor: palette.blue,
                      }}
                    />
                  )}
                </Block>

                <Text size={14} style={{ fontWeight: '600', marginRight: RS(6) }}>
                  {key}.
                </Text>

                <Text size={14} style={{ flex: 1 }}>
                  {text}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Navigation Buttons */}
          <Block
            row
            align="center"
            justify="space-between"
            style={{ marginTop: RS(32) }}
          >
            <TouchableOpacity
              disabled={currentQuestionIndex === 0}
              onPress={() => {
                setCurrentQuestionIndex(prev => prev - 1);
                setSelectedOption(null);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: RS(16),
                paddingVertical: RS(8),
                borderRadius: RS(20),
                backgroundColor: palette.blue,
                opacity: currentQuestionIndex === 0 ? 0.5 : 1,
              }}
            >
              <SvgIcon
                name="arrow-right"
                width={24}
                height={28}
                color="white"
                style={{
                  transform: [{ rotate: '180deg' }],
                  marginRight: RS(8),
                }}
              />
              <Text color="white">Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={currentQuestionIndex === questions.length - 1}
              onPress={() => {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: RS(16),
                paddingVertical: RS(8),
                borderRadius: RS(20),
                borderWidth: 1,
                borderColor: palette.cardBorder,
                backgroundColor: '#FFF',
                opacity:
                  currentQuestionIndex === questions.length - 1 ? 0.5 : 1,
              }}
            >
              <Text color="gray">Next</Text>
              <SvgIcon
                name="arrow-right"
                width={24}
                height={28}
                color="gray"
                style={{ marginLeft: RS(8) }}
              />
            </TouchableOpacity>
          </Block>
        </ScrollView>
      )}
    </Block>
  );
}
