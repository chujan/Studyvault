import React from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Block, Text } from '@components';
import { palette } from '@theme';
import { ChessPieces, DustBin, Numeric } from '@images/home';
import { SvgIcon } from '../../components/svg-icon';
import { styles as homeStyles } from './styles';

const menuItems = [
  { id: 1, label: 'Exam Hub', icon: 'note' },
  { id: 2, label: 'Skills Studio', icon: 'computer' },
  { id: 3, label: 'Brain Games', icon: 'brain' },
  { id: 4, label: 'More', icon: 'menu' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleMenuPress = (id: number) => {
    switch (id) {
      case 1:
        navigation.navigate('ExamHub' as never);
        break;

      case 2:
        navigation.navigate('SkillsStudio' as never);
        break;

      case 3:
        navigation.navigate('BrainGames' as never);
        break;

      case 4:
        navigation.navigate('More' as never);
        break;

      default:
        break;
    }
  };

  return (
    <Block style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.white} />

      {/* Header */}
      <Block style={homeStyles.header}>
        <Block style={homeStyles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={homeStyles.profileImage}
          />
          <Text style={homeStyles.profileName}>Hi, Jennifer</Text>
        </Block>

        <Block style={homeStyles.iconRow}>
          <TouchableOpacity>
            <SvgIcon name="head-phone" width={20} height={20} color={palette.blue} />
          </TouchableOpacity>

          <TouchableOpacity>
            <SvgIcon name="bell" width={20} height={20} color={palette.blue} />
          </TouchableOpacity>
        </Block>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContainer}
      >
        {/* Hero Card */}
        <Block style={homeStyles.card}>
          <Text style={homeStyles.cardTitle}>Welcome</Text>
          <Text style={homeStyles.cardText}>
            This card respects the top padding manually.
          </Text>
        </Block>

        {/* Menu */}
        <Block style={homeStyles.menuRow}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={homeStyles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.id)}
            >
              <Block style={homeStyles.menuIconCircle}>
                <SvgIcon
                  name={item.icon}
                  width={26}
                  height={26}
                  fill={palette.blue}
                />
              </Block>
              <Text style={homeStyles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Popular Section */}
        <Block style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Most Popular</Text>
          <Text style={homeStyles.sectionAction}>View All</Text>
        </Block>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.popularRow}
        >
          {[ChessPieces, DustBin, Numeric].map((img, index) => (
            <Block key={index} style={homeStyles.courseCard}>
              <Block style={homeStyles.imageInset}>
                <Image source={img} style={homeStyles.courseImage} />
              </Block>

              <Text style={homeStyles.courseTitle}>
                {index === 0
                  ? 'Puzzle'
                  : index === 1
                  ? 'Sort the trash'
                  : 'Ancient numbers'}
              </Text>

              <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={homeStyles.star}>⭐ 4.7</Text>
                <Block style={homeStyles.divider} />
                <Text style={homeStyles.courseSub}>Brain games</Text>
              </Block>
            </Block>
          ))}
        </ScrollView>

        {/* Recommended Section */}
        <Block style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Recommended for You</Text>
          <Text style={homeStyles.sectionAction}>View All</Text>
        </Block>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.popularRow}
        >
          {[DustBin, ChessPieces, Numeric].map((img, index) => (
            <Block key={index} style={homeStyles.courseCard}>
              <Block style={homeStyles.imageInset}>
                <Image source={img} style={homeStyles.courseImage} />
              </Block>

              <Text style={homeStyles.courseTitle}>
                {index === 0
                  ? 'Recycle Challenge'
                  : index === 1
                  ? 'Logic Puzzle'
                  : 'Math Basics'}
              </Text>

              <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={homeStyles.star}>⭐ 4.8</Text>
                <Block style={homeStyles.divider} />
                <Text style={homeStyles.courseSub}>Skill Boost</Text>
              </Block>
            </Block>
          ))}
        </ScrollView>

        <Block style={homeStyles.extraContent} />
      </ScrollView>
    </Block>
  );
}
