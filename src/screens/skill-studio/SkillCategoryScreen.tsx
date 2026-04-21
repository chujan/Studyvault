/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { palette } from '@theme';

const categories = [
  { title: 'Design', icon: 'art' },
  { title: 'Coding', icon: 'coding' },
  { title: 'Marketing', icon: 'marketing' },
  { title: 'Business', icon: 'business' },

  { title: 'Accounting', icon: 'accounting' },
  { title: 'Science', icon: 'science' },
  { title: 'Maths', icon: 'maths' },
  { title: 'English', icon: 'english' },

  { title: 'Photography', icon: 'camera' },
  { title: 'Finance', icon: 'finance' },

  { title: 'AI ML', icon: 'ai' },

  { title: 'Health', icon: 'health' },
  { title: 'Music', icon: 'music' },
//   { title: 'Cars', icon: 'cars' },
//   { title: 'Fashion', icon: 'fashion' },

//   { title: 'VR', icon: 'vr' },
//   { title: 'SEO', icon: 'seo' },
//   { title: 'Agriculture', icon: 'agriculture' },
//   { title: 'Architecture', icon: 'architecture' },
];

const SkillCategoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Block
  flex={1}
  color={palette.white}
  
>
      {/* Header */}
      <Block
              row
              align="center"
              justify="center"
              paddingVertical={RS(16)}
              style={[styles.header, { marginTop: insets.top }]}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <SvgIcon name="arrow-left" size={15} />
              </TouchableOpacity>
      
              <Text style={styles.headerTitle}>Category</Text>
            </Block>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
  row
  style={{
    flexWrap: 'wrap',
    paddingHorizontal: RS(16),
    marginTop: (15),
    justifyContent: 'space-between',
  }}
>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '23%', // 4 items per row
                marginBottom: RS(20),
                alignItems: 'center',
              }}
            >
              {/* Icon Circle */}
              <Block
  width={RS(50)}
  height={RS(50)}
  radius={RS(25)}
  align="center"
  justify="center"
  color={palette.blue + '15'}
  style={{ marginBottom: RS(6) }} 
>
                <SvgIcon
                  name={item.icon}
                  size={RS(22)}
                  color={palette.blue}
                />
              </Block>

              {/* Label */}
              <Text size={12} center>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default SkillCategoryScreen;