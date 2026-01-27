/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChessPieces, DustBin, Numeric } from '@images/home';
import { ImageSourcePropType } from 'react-native'

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';

import { Jamb, Waec, Neco, Toefl } from '@images/home';

type MenuItem =
  | {
      id: number;
      label: string;
      iconType: 'image';
      icon: ImageSourcePropType;
    }
  | {
      id: number;
      label: string;
      iconType: 'svg';
      icon: string;
    };


const menuItems: MenuItem[] = [
  { id: 1, label: 'JAMB', iconType: 'image', icon: Jamb },
  { id: 2, label: 'WAEC', iconType: 'image', icon: Waec },
  { id: 3, label: 'NECO', iconType: 'image', icon: Neco },
   { id: 4, label: 'POST-UTME', iconType: 'svg', icon: 'post-utme' },
  { id: 5, label: 'TOEFL', iconType: 'image', icon: Toefl },
 
];


const newsItems = [
  {
    id: 1,
    title: 'NECO releases official 2025 examination timetable',
    date: '04 Jul 2025',
    image: DustBin,
  },
  {
    id: 2,
    title: 'WAEC introduces CBT for private candidates nationwide',
    date: '02 Jul 2025',
    image: Jamb,
  },
];

const ExamHubScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  
    const handleMenuPress = (id: number) => {
      switch (id) {
        case 1:
          navigation.navigate('Jamb' as never);
          break;
  
        case 2:
          navigation.navigate('WaecScreen' as never);
          break;
  
        case 3:
          navigation.navigate('NecoScreen' as never);
          break;
  
        case 4:
          navigation.navigate('UtmeScreen' as never);
          break;
  
        default:
          break;
      }
    };

  return (
    <Block flex={1} style={styles.container}>
      {/* Header */}
      <Block
        row
        align="center"
        justify="center"
        paddingHorizontal={RS(20)}
        paddingVertical={RS(16)}
        style={[styles.header, { marginTop: insets.top }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Exam Hub</Text>
      </Block>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + RS(80) },
        ]}
      >
        {/* CBT Simulator */}
        <Block style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CBT Simulator</Text>
        </Block>

        <Block style={styles.menuRow}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.id)}
            >
              <Block style={styles.menuIconCircle}>
  {item.iconType === 'svg' ? (
    <SvgIcon name={item.icon} size={28} />
  ) : (
    <Image
      source={item.icon}
      style={styles.menuImage}
      resizeMode="contain"
    />
  )}
</Block>

              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Past Questions */}
        <Block style={styles.pastHeader}>
          <Text style={styles.pastTitle}>Past Questions</Text>
        </Block>

        <Block style={styles.menuRow}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              activeOpacity={0.7}
               onPress={() => handleMenuPress(item.id)}
            >
              <Block style={styles.menuIconCircle}>
                {item.iconType === 'image' ? (
  <Image
    source={item.icon}
    style={styles.menuImage}
    resizeMode="contain"
  />
) : (
  <SvgIcon
    name={item.icon}
    size={28}
  />
)}

              </Block>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* News Section */}
        <Block style={styles.pastHeader}>
          <Text style={styles.pastTitle}>News</Text>
          <Text size={12} color="#2F80ED">View All</Text>
        </Block>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsRow}
          style={styles.newsContainer}
        >
          {newsItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.newsCard}
              activeOpacity={0.85}
            >
              {/* Text on the left */}
              <Block style={styles.newsBody}>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.newsMeta}>{item.date}</Text>
              </Block>

              {/* Image on the right */}
              <Block style={styles.newsImageWrapper}>
                <Image
                  source={item.image}
                  style={styles.newsImageLogo}
                />
              </Block>
            </TouchableOpacity>
          ))}
        </ScrollView>

         {/* News Section */}
        <Block style={styles.pastHeader}>
          <Text style={styles.pastTitle}>Upcoming Events</Text>
          <Text size={12} color="#2F80ED">View All</Text>
        </Block>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsRow}
          style={styles.newsContainer}
        >
          {newsItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.newsCard}
              activeOpacity={0.85}
            >
              {/* Text on the left */}
              <Block style={styles.newsBody}>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.newsMeta}>{item.date}</Text>
              </Block>

              {/* Image on the right */}
              <Block style={styles.newsImageWrapper}>
                <Image
                  source={item.image}
                  style={styles.newsImageLogo}
                />
              </Block>
            </TouchableOpacity>
          ))}
        </ScrollView>


      </ScrollView>
    </Block>
  );
};

export default ExamHubScreen;
