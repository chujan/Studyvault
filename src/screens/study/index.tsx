import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Block, Text, SvgIcon } from '@components';
import { styles } from './styles';
import { RS } from '@helpers';

type CategoryItem = {
  label: string;
  icon: string;
  route?: string;
  id: number; // add an id for switch-case navigation
};

const STUDY_CATEGORIES: CategoryItem[] = [
  { id: 1, label: 'Past Questions', icon: 'file-text', route: 'PastQuestionScreen' },
  { id: 2, label: 'Novels', icon: 'book', route: 'Novel' },
  { id: 3, label: 'Video Lessons', icon: 'video', route: 'VideoLessons' },
  { id: 4, label: 'Lesson Notes', icon: 'file', route: 'LessonNotes' },
  { id: 5, label: 'JAMB Brochure', icon: 'awards', route: 'JambBrochureScreen' },
  { id: 6, label: 'JAMB Syllabus', icon: 'note', route: 'JambSyllabusScreen' },
  { id: 7, label: 'WAEC Syllabus', icon: 'lists', route: 'WAECSyllabus' },
];

export default function StudyScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handlePress = (id: number) => {
    switch (id) {
      case 1: navigation.navigate('PastQuestionScreen' as never); break;
      case 2: navigation.navigate('Novel' as never); break;
      case 3: navigation.navigate('VideoLessons' as never); break;
      case 4: navigation.navigate('LessonNotes' as never); break;
      case 5: navigation.navigate('JambBrochureScreen' as never); break;
      case 6: navigation.navigate('JambSyllabusScreen' as never); break;
      case 7: navigation.navigate('WAECSyllabus' as never); break;
      default: break;
    }
  };

  return (
    <Block flex={1} style={styles.container}>
      {/* Header */}
      <Block
        row
        align="center"
        justify="center"
        paddingVertical={RS(16)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <Text style={styles.headerTitle}>Study Resources</Text>
      </Block>

      {/* Categories */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: RS(20), paddingBottom: insets.bottom + 40 }}
      >
        <Block row wrap="wrap" justify="space-between">
          {STUDY_CATEGORIES.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => handlePress(item.id)}
              style={{
                width: '48%',
                height: RS(120),
                marginBottom: RS(16),
                borderRadius: RS(14),
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgIcon name={item.icon} width={RS(36)} height={RS(36)} />
              <Text style={{ marginTop: RS(8), fontSize: RS(14), fontWeight: '600' }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
}
