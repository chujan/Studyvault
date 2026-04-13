import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@components/theme';

// Define Subject type
type Subject = {
  id: string;
  name: string;
};

export default function JambSyllabusScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();

  const [searchText, setSearchText] = useState<string>('');

  // Sample subjects
  const subjects: Subject[] = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Physics' },
    { id: '3', name: 'Chemistry' },
    { id: '4', name: 'Biology' },
    { id: '5', name: 'English' },
    { id: '6', name: 'Economics' },
    { id: '7', name: 'Literature in English' },
  ];

  // Filter subjects based on search text
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Render each subject row
  const renderSubjectItem: ListRenderItem<Subject> = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#FFFFFF',
        paddingVertical: RS(14),
        paddingHorizontal: RS(12),
        borderRadius: RS(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: RS(12),
      }}
     onPress={() => {
  navigation.navigate('JambSyllabusDetailScreen', {
    subject: item.name,
  });
}}

    >
      <Text size={16} color="#333">
        {item.name}
      </Text>
      <SvgIcon name="arrow-right" size={23} color="#777" />
    </TouchableOpacity>
  );

  return (
    <Block flex={1} style={{ backgroundColor: '#F3F3F3' }}>
      {/* HEADER */}
      <Block
        style={{
          backgroundColor: '#EFE7E3',
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
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SvgIcon name="book" size={18} />
          </Block>
        </Block>

        {/* Title */}
        <Block style={{ marginTop: RS(20) }}>
             <Text size={22} weight="bold">
                        Jamb Syllabus
                      </Text>
            
           
          <Text size={14} color="#777" style={{ marginTop: RS(4) }}>
            The Jamb Syllabus is an official document that contains detailed information and guidance on the areas or topics you are expected to cover for the UTME in a particular subject. The questions you will answer on examination day will be drawn from these areas or topics.
          </Text>
        </Block>
      </Block>

      {/* CONTENT */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: RS(20), paddingTop: RS(16) }}
        contentContainerStyle={{ paddingBottom: RS(24) }}
      >
        
        {/* SEARCH BAR */}
        <Block
          style={{
            borderWidth: 1,
            borderColor: palette.grayScale4,
            borderRadius: RS(10),
             paddingHorizontal: RS(12),
             paddingVertical: RS(16),
          
           
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: RS(16),
          }}
        >
          <SvgIcon name="search" size={18} color="#777" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Subject"
            placeholderTextColor="#777"
            style={{
              flex: 1,
              marginLeft: RS(8),
              fontSize: 14,
              color: '#000',
            }}
          />
        </Block>
      <Text size={15} style={{ marginBottom: RS(16) }}>
                    Choose a subject
                    </Text>

        {/* SUBJECT LIST */}
        <FlatList
          data={filteredSubjects}
          renderItem={renderSubjectItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // inside ScrollView
        />
      </ScrollView>
    </Block>
  );
}
