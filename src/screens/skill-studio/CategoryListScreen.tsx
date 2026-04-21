/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block, Text, SvgIcon } from '@components';
import { useNavigation } from '@react-navigation/native';
import { RS } from '@helpers';
import { styles } from './styles';
import { palette } from '@theme';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* ================= TYPES ================= */
type Course = {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
};

type RootStackParamList = {
  VideoDetailScreen: {
    item: Course;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* ================= DATA ================= */
const courses: Course[] = [
  {
    id: 1,
    title: 'Introduction of Figma',
    author: 'Jacob Jones',
    price: '$100.00',
    image: 'https://picsum.photos/200',
  },
  {
    id: 2,
    title: 'Logo Design Basics',
    author: 'Eleanor Hoss',
    price: '$120.00',
    image: 'https://picsum.photos/201',
  },
  {
    id: 3,
    title: 'Introduction of Figma',
    author: 'Katlyn Murphy',
    price: '$100.00',
    image: 'https://picsum.photos/202',
  },
  {
    id: 4,
    title: 'User-Centered Design',
    author: 'Marion Wilkinson',
    price: '$200.00',
    image: 'https://picsum.photos/203',
  },
];

/* ================= COURSE ITEM ================= */
type CourseItemProps = {
  item: Course;
};

const CourseItem = ({ item }: CourseItemProps) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('VideoDetailScreen', { item })
      }
      activeOpacity={0.8}
    >
      <Block
        row
        align="center"
        color={palette.white}
        style={{
          padding: RS(12),
          marginBottom: RS(16),
          borderRadius: RS(16),
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        {/* Image */}
        <Image
          source={{ uri: item.image }}
          style={{
            width: RS(70),
            height: RS(70),
            borderRadius: RS(12),
          }}
        />

        {/* Content */}
        <Block flex={1} style={{ marginLeft: RS(12) }}>
          <Text size={14} bold color={palette.black}>
            {item.title}
          </Text>

          {/* Author */}
          <Block row align="center" style={{ marginTop: RS(6) }}>
            <SvgIcon name="user" size={14} color={palette.gray} />
            <Text
              size={12}
              color={palette.gray}
              style={{ marginLeft: RS(6) }}
            >
              {item.author}
            </Text>
          </Block>

          {/* Price + Tag */}
          <Block row align="center" style={{ marginTop: RS(8) }}>
            <Text size={14} bold color={palette.blue}>
              {item.price}
            </Text>

            <Block
              style={{
                marginLeft: RS(10),
                paddingHorizontal: RS(8),
                paddingVertical: RS(3),
                borderRadius: RS(6),
                backgroundColor: '#FFE8B3',
              }}
            >
              <Text size={10} bold color="#D98C00">
                POPULAR
              </Text>
            </Block>
          </Block>
        </Block>

        {/* Bookmark */}
        <TouchableOpacity>
          <Block
            width={RS(28)}
            height={RS(28)}
            radius={RS(6)}
            align="center"
            justify="center"
          >
            <SvgIcon name="book-marks" size={18} color={palette.blue} />
          </Block>
        </TouchableOpacity>
      </Block>
    </TouchableOpacity>
  );
};

/* ================= SCREEN ================= */
const CategoryListScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  return (
    <Block flex={1} color={palette.white}>
      {/* Header */}
      <Block
        row
        align="center"
        justify="center"
        style={[styles.header, { marginTop: insets.top, paddingVertical: RS(16) }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Category</Text>
      </Block>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ paddingHorizontal: RS(16), paddingVertical: RS(16) }}>
          {courses.map(item => (
            <CourseItem key={item.id} item={item} />
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default CategoryListScreen;