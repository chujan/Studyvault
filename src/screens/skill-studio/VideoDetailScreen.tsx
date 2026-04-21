/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@theme';

const { width } = Dimensions.get('window');

const lessons = [
  { id: 1, title: 'Introduction', duration: '3:20' },
  { id: 2, title: 'Understanding Basics', duration: '6:45' },
  { id: 3, title: 'Practical Setup', duration: '5:10' },
  { id: 4, title: 'Final Project', duration: '8:00' },
];

const VideoDetailScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const item = route?.params?.item;

  return (
    <Block flex={1} color={palette.white}>

      {/* Header */}
      <Block
        row
        align="center"
        justify="space-between"
        paddingHorizontal={RS(16)}
        style={{ marginTop: insets.top, paddingVertical: RS(10) }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="arrow-left" size={18} />
        </TouchableOpacity>

        <Text size={16} bold>
          Course Details
        </Text>

        <TouchableOpacity>
          <SvgIcon name="book-marks" size={18} color={palette.blue} />
        </TouchableOpacity>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* VIDEO PLAYER */}
        <Block
  width={width}
  height={RS(220)}
  justify="center"
  align="center"
  style={{
    backgroundColor: '#000',
  }}
>
          <Image
            source={{ uri: item?.image }}
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.7,
            }}
          />

          {/* Play Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: RS(60),
              height: RS(60),
              borderRadius: RS(30),
              backgroundColor: 'rgba(255,255,255,0.9)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgIcon name="play" size={22} color={palette.blue} />
          </TouchableOpacity>
        </Block>

        {/* COURSE INFO */}
        <Block style={{ padding: RS(16) }}>
          <Text size={18} bold color={palette.black}>
            {item?.title}
          </Text>

          <Block row align="center" style={{ marginTop: RS(8) }}>
            <SvgIcon name="user" size={14} color={palette.gray} />
            <Text size={12} color={palette.gray} style={{ marginLeft: RS(6) }}>
              {item?.author}
            </Text>
          </Block>

          <Block row align="center" justify="space-between" style={{ marginTop: RS(10) }}>
            <Text size={16} bold color={palette.blue}>
              {item?.price}
            </Text>

           <Block
  paddingHorizontal={RS(10)}
  paddingVertical={RS(4)}
  radius={RS(6)}
  style={{ backgroundColor: '#FFE8B3', borderRadius: RS(6) }}
>
              <Text size={10} bold color="#D98C00">
                POPULAR
              </Text>
            </Block>
          </Block>

          {/* Progress */}
          <Block style={{ marginTop: RS(16) }}>
            <Text size={12} color={palette.gray}>
              Progress
            </Text>

            <Block
  height={RS(6)}
  style={{
    marginTop: RS(6),
    backgroundColor: '#E6E6E6',
    borderRadius: RS(10),
  }}
>
              <Block
  width="40%"
  height={RS(6)}
  style={{
    backgroundColor: palette.blue,
    borderRadius: RS(10),
  }}
/>
            </Block>

            <Text size={11} color={palette.gray} style={{ marginTop: RS(6) }}>
              40% Completed
            </Text>
          </Block>

          {/* DESCRIPTION */}
          <Block style={{ marginTop: RS(20) }}>
            <Text size={14} bold>
              Description
            </Text>

            <Text size={12} color={palette.gray} style={{ marginTop: RS(6), lineHeight: 18 }}>
              Learn UI/UX design fundamentals, Figma tools, and real-world design
              workflow used by professionals in modern product design teams.
            </Text>
          </Block>

          {/* LESSONS */}
          <Block style={{ marginTop: RS(20) }}>
            <Text size={14} bold>
              Lessons
            </Text>

            {lessons.map(item => (
              <Block
  key={item.id}
  row
  align="center"
  justify="space-between"
  style={{
    marginTop: RS(10),
    padding: RS(12),
    borderRadius: RS(12),
    backgroundColor: '#F7F8FA',
  }}
>
                <Block row align="center">
                  <Block
  width={RS(30)}
  height={RS(30)}
  align="center"
  justify="center"
  style={{
    borderRadius: RS(15),
    backgroundColor: '#E6EEFF',
  }}
>
                    <SvgIcon name="play" size={14} color={palette.blue} />
                  </Block>

                  <Text style={{ marginLeft: RS(10) }} size={13}>
                    {item.title}
                  </Text>
                </Block>

                <Text size={11} color={palette.gray}>
                  {item.duration}
                </Text>
              </Block>
            ))}
          </Block>
        </Block>
      </ScrollView>

      {/* BOTTOM CTA */}
      <Block
  style={{
    padding: RS(16),
    backgroundColor: palette.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  }}
>
        <TouchableOpacity
          style={{
            backgroundColor: palette.blue,
            padding: RS(14),
            borderRadius: RS(12),
            alignItems: 'center',
          }}
        >
          <Text color={palette.white} bold size={14}>
            Continue Watching
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default VideoDetailScreen;