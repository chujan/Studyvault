import React, { useRef, useState } from 'react';
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RS } from '@helpers';
import { palette, family } from '@components/theme';
import { styles } from './ViewPerformanceStyles';
import { Block, SvgIcon, Text } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function FlashStudyScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { exam, subject, questions } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Interpolations for flip animation
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  // Flip function
  const flipCard = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 20,
      useNativeDriver: true,
    }).start();

    setFlipped(!flipped);
  };

  // Navigation
  const goPrev = () =>
    setCurrentQuestionIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentQuestionIndex((i) => Math.min(i + 1, questions.length - 1));

  return (
    <Block flex={1} style={[styles.container, { backgroundColor: '#F2F3F7' }]}>
      
      {/* Header */}
      <Block
        row
        align="center"
        justify="flex-start"
        paddingHorizontal={RS(20)}
        paddingVertical={RS(16)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { zIndex: 10 }]}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: RS(16),
            fontWeight: '700',
            color: '#222',
          }}
        >
          {exam}
        </Text>

        <Text
          style={{
            fontSize: RS(14),
            fontWeight: '600',
            color: '#333',
            paddingHorizontal: RS(14),
            paddingVertical: RS(2),
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 2,
            borderRadius: RS(8),
            textAlign: 'center',
          }}
        >
          {currentQuestionIndex + 1}/{questions.length}
        </Text>
      </Block>

      {/* Center Area */}
      <Block flex={1} justify="center" align="center">
        
        {/* Subject/Exam Info */}
        <Block row align="center" style={{ marginBottom: RS(14) }}>
          <Block
            row
            align="center"
            style={{
              paddingHorizontal: RS(14),
              paddingVertical: RS(8),
              borderRadius: RS(18),
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Block
              align="center"
              justify="center"
              style={{
                width: RS(24),
                height: RS(24),
                borderRadius: RS(12),
                backgroundColor: '#EAF3FF',
                marginRight: RS(8),
              }}
            >
              <SvgIcon name="note" size={14} />
            </Block>

            <Text>
              <Text style={{ fontSize: RS(14), fontWeight: '600', color: '#222' }}>
                {subject}
              </Text>
              <Text style={{ fontSize: RS(13), color: '#8E8E93' }}>
                {' '}· {exam}
              </Text>
            </Text>
          </Block>

          <Text
            style={{
              fontSize: RS(14),
              fontWeight: '600',
              color: '#333',
              marginLeft: RS(12),
            }}
          >
            Questions
          </Text>
        </Block>

        {/* Flip Card */}
        <TouchableOpacity activeOpacity={1} onPress={flipCard}>
          {/* FRONT - Question */}
          <Animated.View
            style={{
              width: width * 0.8,
              height: 400,
              borderRadius: 16,
              backfaceVisibility: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 6 },
              shadowRadius: 12,
              elevation: 10,
              transform: [{ rotateY: frontInterpolate }, { scale: scaleAnim }],
            }}
          >
            <LinearGradient
              colors={['#6a11cb', '#2575fc']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ ...StyleSheet.absoluteFillObject, borderRadius: 16 }}
            />
            <Block
  flex={1}
  justify="center"
  align="center"
  style={{ padding: 20 }}
>
              <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
                {questions[currentQuestionIndex]?.text || 'No Question'}
              </Text>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 12 }}>
                Tap to see answer
              </Text>
            </Block>
          </Animated.View>

          {/* BACK - Answer */}
          <Animated.View
            style={{
              width: width * 0.8,
              height: 400,
              padding: 24,
              backgroundColor: '#fff',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 6 },
              shadowRadius: 12,
              elevation: 10,
              transform: [{ rotateY: backInterpolate }, { scale: scaleAnim }],
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center' }}>
              {questions[currentQuestionIndex]?.answer || 'No Answer'}
            </Text>
            <Text style={{ fontSize: 14, color: '#888', marginTop: 20 }}>
              Tap to go back
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Block>

      {/* Show Answer Button */}
      <Block
        row
        align="center"
        justify="center"
        style={{ marginBottom: RS(20) + insets.bottom, paddingHorizontal: RS(16) }}
      >
        <TouchableOpacity
          onPress={flipCard} // flips card to show answer
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RS(30),
            paddingVertical: RS(12),
            borderRadius: RS(20),
            backgroundColor: palette.greenText,
          }}
        >
          <SvgIcon name="stars" width={20} height={20} color="white" style={{ marginRight: RS(6) }} />
          <Text size={14} style={{ fontFamily: family.Medium }} color="white">
            Show Answer
          </Text>
        </TouchableOpacity>
      </Block>

      {/* Navigation Buttons */}
      <Block
        row
        align="center"
        justify="space-between"
        style={{ marginBottom: RS(20) + insets.bottom, paddingHorizontal: RS(16) + insets.left }}
      >
        {/* Previous */}
        <TouchableOpacity
          onPress={goPrev}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RS(16),
            paddingVertical: RS(8),
            borderRadius: RS(20),
            backgroundColor: palette.blue,
          }}
        >
          <SvgIcon
            name="arrow-right"
            width={24}
            height={28}
            color="white"
            style={{ transform: [{ rotate: '180deg' }], marginRight: RS(8) }}
          />
          <Text size={14} style={{ fontFamily: family.Medium }} color="white">
            Previous
          </Text>
        </TouchableOpacity>

        {/* Shuffle */}
        <TouchableOpacity
          onPress={() => {
            const randomIndex = Math.floor(Math.random() * questions.length);
            setCurrentQuestionIndex(randomIndex);
            if (flipped) flipCard(); // flip back if showing answer
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RS(16),
            paddingVertical: RS(8),
            borderRadius: RS(20),
            backgroundColor: palette.orange,
          }}
        >
          <SvgIcon name="shuffle" width={20} height={20} color="white" style={{ marginRight: RS(6) }} />
          <Text size={14} style={{ fontFamily: family.Medium }} color="white">
            Shuffle
          </Text>
        </TouchableOpacity>

        {/* Next */}
        <TouchableOpacity
          onPress={goNext}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RS(16),
            paddingVertical: RS(8),
            borderRadius: RS(20),
            borderWidth: 1,
            borderColor: palette.cardBorder,
            backgroundColor: '#FFF',
          }}
        >
          <Text size={14} style={{ fontFamily: family.Medium }} color="gray">
            Next
          </Text>
          <SvgIcon
            name="arrow-right"
            width={24}
            height={28}
            color="gray"
            style={{ marginLeft: RS(8) }}
          />
        </TouchableOpacity>
      </Block>
    </Block>
  );
}
