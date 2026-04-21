import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';

import { styles } from './styles';
import { palette } from '@components/theme';
import { ChessPieces, DustBin, Numeric } from '@assets/images';

export default function SkillsStudioScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState('');
  const [skills, setSkills] = useState([
    { name: 'UI Design', level: 'Beginner' },
    { name: 'React Native', level: 'Intermediate' },
    { name: 'Swift', level: 'Advanced' },
  ]);

  const [filteredSkills, setFilteredSkills] = useState(skills);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSkills(skills);
    } else {
      const filtered = skills.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  }, [search, skills]);

  const menuItems = [
    { id: 1, label: 'Design', icon: 'art' },
    { id: 2, label: 'Coding', icon: 'coding' },
    { id: 3, label: 'Business', icon: 'business' },
    { id: 4, label: 'Science', icon: 'science' },
  ];

  return (
    <Block flex={1}>
      
      {/* HEADER (moved OUTSIDE scroll) */}
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

        <Text style={styles.headerTitle}>Skills Studio</Text>
      </Block>

      {/* SCROLL CONTENT */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: RS(20) }}
        showsVerticalScrollIndicator={false}
      >
        <Block paddingHorizontal={RS(16)}>

          {/* SEARCH */}
          <Block
            row
            align="center"
            justify="space-between"
            style={{ marginBottom: RS(16) }}
          >
            <Block
              row
              align="center"
              paddingHorizontal={RS(12)}
              style={{
                height: RS(44),
                borderRadius: RS(10),
                backgroundColor: palette.white,
                width: '85%',
              }}
            >
              <SvgIcon name="search" size={20} color={palette.blue} />
              <TextInput
                placeholder="Search skills..."
                value={search}
                onChangeText={setSearch}
                style={{ flex: 1, marginLeft: RS(8) }}
              />
            </Block>

            <TouchableOpacity style={styles.filterBtn}>
              <SvgIcon name="filter" size={20} color={palette.blue} />
            </TouchableOpacity>
          </Block>

          {/* EMPTY STATE */}
          {filteredSkills.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: RS(20) }}>
              No skills found
            </Text>
          )}

          {/* CATEGORIES */}
         <Block style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Categories</Text>

  <TouchableOpacity
    onPress={() => navigation.navigate('SkillCategoryScreen')}
  >
    <Text style={styles.sectionAction}>View All</Text>
  </TouchableOpacity>
</Block>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Block row>
              {menuItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={{ alignItems: 'center', marginRight: RS(20) }}
                onPress={() =>
  navigation.navigate('CategoryListScreen', {
    category: item.label,
  })
}
                >
                  <Block style={styles.menuIconCircle}>
                    <SvgIcon
  name={item.icon}
  size={26}
  color={palette.blue}
/>
                  </Block>

                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>

          {/* RECENTLY WATCHED */}
          <Block style={[styles.sectionHeader, { marginTop: RS(40) }]}>
            <Text style={styles.sectionTitle}>Recently Watched</Text>
            <Text style={styles.sectionAction}>View All</Text>
          </Block>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[DustBin, ChessPieces, Numeric].map((img, idx) => (
              <Block key={idx} style={styles.courseCard}>
                <Image source={img} style={styles.courseImage} />

                <Text style={styles.courseTitle}>
                  {idx === 0
                    ? 'Recycle Challenge'
                    : idx === 1
                    ? 'Logic Puzzle'
                    : 'Math Basics'}
                </Text>

                <Text style={styles.courseSub}>⭐ 4.8 • Skill Boost</Text>
              </Block>
            ))}
          </ScrollView>

          {/* TRENDING SKILLS */}
          <Block style={[styles.sectionHeader, { marginTop: RS(20) }]}>
            <Text style={styles.sectionTitle}>Trending Skills</Text>
          </Block>

          {filteredSkills.map((item, index) => (
            <Block key={index} style={styles.skillCard}>
              <Block>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Text style={styles.courseSub}>
                  By John Doe • 1h 20m
                </Text>

                <Text style={styles.badge}>{item.level}</Text>
              </Block>

              <TouchableOpacity>
                <SvgIcon
                  name="book-marked"
                  size={18}
                  color={palette.blue}
                />
              </TouchableOpacity>
            </Block>
          ))}

        </Block>
      </ScrollView>
    </Block>
  );
}