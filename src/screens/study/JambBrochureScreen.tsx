import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@components/theme';
import { styles } from './styles';

type InstitutionType = 'university' | 'polytechnic' | 'college';

export default function JambBrochureScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();

  const [activeTab, setActiveTab] =
    useState<InstitutionType>('university');
  const [searchText, setSearchText] =
    useState<string>('');

  useEffect(() => {
    setSearchText('');
  }, [activeTab]);

  const getPlaceholder = () => {
    return 'Search Faculties';
  };

  const facultyData = {
    university: [
      'Engineering',
      'Law',
      'Medicine',
      'Social Sciences',
      'Arts',
      'Science',
    ],
    polytechnic: [
      'Engineering',
      'Environmental Studies',
      'Business',
      'Applied Sciences',
      'ICT',
    ],
    college: [
      'Education',
      'Arts Education',
      'Science Education',
      'Vocational Studies',
    ],
  };

  const faculties = facultyData[activeTab].filter(faculty =>
    faculty
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  return (
    <Block
      flex={1}
      style={[
        styles.container,
        { backgroundColor: '#F5F5F5' },
      ]}
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
          Jamb Brochure
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
        {/* Info Card */}
        <Block style={styles.newsCard}>
          <Block
            row
            align="center"
            style={{ width: '100%' }}
          >
            <Block
              style={{
                flex: 1,
                paddingRight: RS(12),
              }}
            >
              <Text style={styles.newsTitle}>
                The official JAMB brochure
                provides a list of courses
                offered at various
                institutions, along with
                their JAMB, O'Level, and
                Direct Entry subject
                combinations.
              </Text>
            </Block>

            <Block
              style={{
                backgroundColor:
                  palette.borderColor,
                padding: RS(8),
                borderRadius: RS(25),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgIcon name="book" size={20} />
            </Block>
          </Block>
        </Block>

        {/* Tabs */}
        <Block
          row
          style={{
            backgroundColor: '#E5E5E5',
            borderRadius: RS(30),
            padding: RS(4),
            marginTop: RS(24),
          }}
        >
          {[
            {
              key: 'university',
              label: 'University',
            },
            {
              key: 'polytechnic',
              label: 'Polytechnic',
            },
            {
              key: 'college',
              label: 'College of Edu',
            },
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() =>
                setActiveTab(
                  tab.key as InstitutionType,
                )
              }
              style={{
                flex: 1,
                backgroundColor:
                  activeTab === tab.key
                    ? '#FFFFFF'
                    : 'transparent',
                paddingVertical: RS(10),
                borderRadius: RS(25),
                alignItems: 'center',
              }}
            >
              <Text
                weight={
                  activeTab === tab.key
                    ? '600'
                    : '400'
                }
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Search */}
        <Block style={{ marginVertical: RS(16) }}>
          <Block
            row
            align="center"
            style={{
              borderWidth: 1,
              borderColor:
                palette.grayScale4,
              borderRadius: RS(10),
              paddingHorizontal: RS(12),
              paddingVertical: RS(4),
            }}
          >
            <SvgIcon
              name="search"
              size={18}
              color={palette.ashText}
              style={{
                marginRight: RS(8),
              }}
            />

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder={getPlaceholder()}
              placeholderTextColor={
                palette.ashText
              }
              style={{
                flex: 1,
                fontSize: RS(14),
                color: palette.ashText,
                paddingVertical: RS(12),
              }}
            />
          </Block>
        </Block>

        {/* Faculties */}
        <Block>
          <Text
            weight="600"
            style={{
              marginBottom: RS(12),
              fontSize: RS(16),
            }}
          >
            Choose your faculty
          </Text>

          {faculties.map((faculty, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(
                  'JambBrochureDetailScreen',
                  {
                    faculty,
                    institutionType:
                      activeTab,
                  },
                )
              }
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: RS(14),
                paddingHorizontal:
                  RS(16),
                borderRadius: RS(10),
                marginBottom: RS(12),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:
                  'space-between',
              }}
            >
              <Text>{faculty}</Text>
              <SvgIcon
                name="arrow-right"
                size={23}
                color="#777"
              />
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
}