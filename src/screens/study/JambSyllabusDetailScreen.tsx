import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@components/theme';
import { styles } from './styles';

import { getJambSyllabus, JambSyllabus } from '@services/jambSyllabus';

type RouteParams = {
  JambSyllabusDetail: {
    subject: string;
  };
};

export default function JambSyllabusDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, 'JambSyllabusDetail'>>();

  const { subject } = route.params;

  const [syllabus, setSyllabus] = useState<JambSyllabus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const data = await getJambSyllabus(subject);
      setSyllabus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Block flex={1} style={styles.container}>
      {/* Header */}
      <Block
        style={[styles.header, { marginTop: insets.top, paddingVertical: RS(16) }]}
        align="center"
        justify="center"
      >
        <Text style={styles.headerTitle}>{subject}</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: RS(20), top: RS(16) }}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
      </Block>

      {/* Loading */}
      {loading && (
        <Block flex={1} justify="center" align="center">
         <ActivityIndicator size="large" color={palette.blue} />
          <Text style={{ marginTop: 10 }}>Loading syllabus...</Text>
        </Block>
      )}

      {/* Error */}
      {error && !loading && (
        <Block flex={1} justify="center" align="center">
          <Text style={{ color: 'red' }}>{error}</Text>
        </Block>
      )}

      {/* Syllabus Content */}
      {!loading && syllabus && (
        <ScrollView style={{ padding: RS(16) }}>
          {/* General Objective */}
          <Text bold style={{ marginBottom: 10, fontSize: 16 }}>
            General Objective:
          </Text>
          <Text>{syllabus.general_objective}</Text>

          {/* Course Objectives */}
          <Text bold style={{ marginTop: 16, marginBottom: 10, fontSize: 16 }}>
            Course Objectives:
          </Text>
          {syllabus.course_objectives.map((obj, idx) => (
            <Text key={idx} style={{ marginLeft: RS(8), marginBottom: 4 }}>
              • {obj}
            </Text>
          ))}

          {/* Topics */}
          {syllabus.topics.map((topic, idx) => (
            <Block key={idx} style={{ marginTop: 20 }}>
              <Text bold style={{ fontSize: 16, marginBottom: 4 }}>
                {topic.chapter}
              </Text>

              <Text italic style={{ marginBottom: 4 }}>Objectives:</Text>
              {topic.objectives.map((obj, i) => (
                <Text key={i} style={{ marginLeft: RS(8), marginBottom: 2 }}>
                  • {obj}
                </Text>
              ))}

              <Text italic style={{ marginTop: 6, marginBottom: 4 }}>Subtopics:</Text>
              {topic.subtopics.map((sub, i) => (
                <Text key={i} style={{ marginLeft: RS(8), marginBottom: 2 }}>
                  • {sub}
                </Text>

                
              ))}
              
            </Block>
          ))}
          {/* Recommended Texts */}
{syllabus.recommended_texts && syllabus.recommended_texts.length > 0 && (
  <Block style={{ marginTop: 20 }}>
    <Text bold style={{ fontSize: 16, marginBottom: 10 }}>
      Recommended Texts:
    </Text>
    {syllabus.recommended_texts.map((text, idx) => (
      <Text key={idx} style={{ marginLeft: RS(8), marginBottom: 4 }}>
        • {text}
      </Text>
    ))}
  </Block>
)}
        </ScrollView>
      )}
    </Block>
  );
}