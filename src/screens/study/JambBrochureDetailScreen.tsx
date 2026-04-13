import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@components/theme';
import { styles } from './styles';

export default function JambBrochureDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  const { faculty } = route.params as {
    faculty: string;
  };

  const courseData: Record<string, string[]> = {
    Engineering: [
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
      'Chemical Engineering',
      'Computer Engineering',
    ],
    Medicine: [
      'Medicine & Surgery',
      'Nursing',
      'Physiology',
      'Anatomy',
      'Medical Laboratory Science',
    ],
    Law: [
      'Public Law',
      'Private Law',
      'International Law',
      'Commercial Law',
    ],
    Arts: [
      'English Language',
      'History',
      'Philosophy',
      'Theatre Arts',
      'Linguistics',
    ],
    Science: [
      'Physics',
      'Chemistry',
      'Biology',
      'Mathematics',
      'Microbiology',
    ],
    'Social Sciences': [
      'Economics',
      'Political Science',
      'Sociology',
      'Psychology',
      'Geography',
    ],
    Business: [
      'Accounting',
      'Business Administration',
      'Marketing',
      'Banking & Finance',
    ],
    ICT: [
      'Computer Science',
      'Information Technology',
      'Software Engineering',
      'Cyber Security',
    ],
    Education: [
      'Educational Management',
      'Guidance & Counselling',
      'Curriculum Studies',
    ],
  };

  const courses = courseData[faculty] || [];

  return (
    <Block
      flex={1}
      style={[styles.container, { backgroundColor: '#F5F5F5' }]}
    >
      {/* Header */}
      <Block
        style={[
          styles.header,
          {
            marginTop: insets.top,
            paddingVertical: RS(16),
          },
        ]}
        align="center"
        justify="center"
      >
        <Text style={styles.headerTitle}>
          {faculty}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: RS(20),
            top: RS(16),
          }}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RS(140),
          paddingHorizontal: RS(16),
        }}
      >
        <Text
          weight="600"
          style={{
            fontSize: RS(16),
            marginBottom: RS(16),
          }}
        >
          Courses in Faculty of {faculty}
        </Text>

        {courses.length > 0 ? (
          courses.map((course, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('CoursesDetailScreen', {
                  faculty,
                  course,
                })
              }
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: RS(14),
                paddingHorizontal: RS(16),
                borderRadius: RS(10),
                marginBottom: RS(12),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{course}</Text>

              <SvgIcon
                name="arrow-right"
                size={23}
                color="#777"
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No courses available.</Text>
        )}
      </ScrollView>
    </Block>
  );
}