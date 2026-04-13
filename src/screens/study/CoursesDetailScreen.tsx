import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';

import { getCourseInfo, Course } from '@services/jambBrochure';


export default function CoursesDetailScreen() {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  const { course } = route.params as {
    faculty: string;
    course: string;
  };

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadCourse = async () => {
      try {
        const data = await getCourseInfo(course);
        setCourseData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();

  }, []);

  return (

    <Block flex={1} style={{ backgroundColor:'#F5F5F5' }}>

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
          {course}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position:'absolute',
            left:RS(20),
            top:RS(16),
          }}
        >
          <SvgIcon name="arrow-left" size={15}/>
        </TouchableOpacity>

      </Block>


      <ScrollView
        contentContainerStyle={{
          padding:RS(16),
          paddingBottom:RS(120),
        }}
      >

      {loading && <ActivityIndicator size="large"/>}


      {courseData && (

      <Block>


      {/* Institutions */}

      <Text weight="700" style={{marginBottom:RS(6)}}>
        Institutions Offering
      </Text>

      {courseData.institutionsOffering.map((item,index)=>(
        <Text key={index}>
          • {item}
        </Text>
      ))}



      {/* OLevel Requirements */}

      <Text
        weight="700"
        style={{marginTop:RS(16)}}
      >
        O-Level Requirements
      </Text>

      <Text>
        Minimum Credits Required: {courseData.oLevelRequirements.totalCredits}
      </Text>

      {courseData.oLevelRequirements.minimumCredits.map((item,index)=>(
        <Text key={index}>
          • {item}
        </Text>
      ))}



      {/* JAMB Subject Combination */}

      <Text
        weight="700"
        style={{marginTop:RS(16)}}
      >
        JAMB Subject Combination
      </Text>

      {courseData.jambSubjectCombination.map((item,index)=>(
        <Text key={index}>
          • {item}
        </Text>
      ))}



      {/* Direct Entry */}

      <Text
        weight="700"
        style={{marginTop:RS(16)}}
      >
        Direct Entry Requirements
      </Text>

      {courseData.directEntry.requirements.map((item,index)=>(
        <Text key={index}>
          • {item}
        </Text>
      ))}



      {/* Special Waivers */}

      <Text
        weight="700"
        style={{marginTop:RS(16)}}
      >
        Special Waivers / Remarks
      </Text>

      {Object.entries(courseData.specialWaiverRemarks).map(
        ([school,remark],index)=>(
          <Text key={index}>
            {school} - {remark}
          </Text>
      ))}



      {/* Careers */}

      <Text
        weight="700"
        style={{marginTop:RS(16)}}
      >
        Career Opportunities
      </Text>

      {courseData.careerOpportunities.map((item,index)=>(
        <Text key={index}>
          • {item}
        </Text>
      ))}


      </Block>

      )}

      </ScrollView>

    </Block>

  );
}