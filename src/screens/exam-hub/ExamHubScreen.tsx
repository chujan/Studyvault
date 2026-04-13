/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import axios from 'axios';
import { palette } from '@theme';
import { XMLParser } from 'fast-xml-parser';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';

import { db, firebaseAuth } from '../../config/firebase';
import { Jamb, Waec, Neco, Exam, School } from '@assets/images';

// ----- Types -----
type RootStackParamList = {
  TabNavigator: undefined;
  Jamb: undefined;
  WaecScreen: undefined;
  NecoScreen: undefined;
  UtmeScreen: undefined;
  FlashCardScreen: undefined;
  BookmarkedScreen: undefined;
  ForumScreen: undefined;
  LeaderBoardScreen:undefined;
   EventDetailScreen: { event: EventItem };
  SubscribeScreen: undefined;
  WebViewScreen: { url: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type MenuItem =
  | { id: number; label: string; iconType: 'image'; icon: ImageSourcePropType }
  | { id: number; label: string; iconType: 'svg'; icon: string };

type EventItem = {
  id: number;
  title: string;
  date: string;
  link: string;
  image: ImageSourcePropType | { uri: string };
  eventDate: Date | null;
   content?: string;
};

type NewsItem = {
  id: number;
  title: string;
  date: string;
  link: string;
  image: ImageSourcePropType | { uri: string };
};

interface FirestoreEvent {
  title?: string;
  date?: string;
  link?: string;
  image?: string;
  content?: string;
  eventDate?: any; // Firestore Timestamp | string | {seconds:number}
}

// ----- Menu Data -----
const cbtItems: MenuItem[] = [
  { id: 1, label: 'JAMB CBT', iconType: 'image', icon: Jamb },
  { id: 2, label: 'WAEC CBT', iconType: 'image', icon: Waec },
  { id: 3, label: 'NECO CBT', iconType: 'image', icon: Neco },
  { id: 4, label: 'POST-UTME CBT', iconType: 'svg', icon: 'post-utme' },
];

const quickLinks: MenuItem[] = [
  { id: 1, label: 'FlashCards', iconType: 'svg', icon: 'flash-card' },
  { id: 2, label: 'Bookmarks', iconType: 'svg', icon: 'book-mark' },
  { id: 3, label: 'LeaderBoard', iconType: 'svg', icon: 'forum' },
  { id: 4, label: 'Subscribe', iconType: 'svg', icon: 'payments' },
];

// ----- Helper -----
const extractExamDate = (title: string): Date | null => {
  const regex =
    /(\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4})|((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},?\s\d{4})/i;
  const match = title.match(regex);
  if (match && match[0]) return new Date(match[0]);
  return null;
};

// ----- Random Image Helper -----
const examImages = [Jamb, Waec, Neco, Exam, School];
const getRandomExamImage = (): ImageSourcePropType => {
  const randomIndex = Math.floor(Math.random() * examImages.length);
  return examImages[randomIndex];
};

// ----- Component -----
const ExamHubScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const handleMenuPress = (id: number, type: 'cbt' | 'quick') => {
    if (type === 'cbt') {
      switch (id) {
        case 1:
          navigation.navigate('Jamb');
          break;
        case 2:
          navigation.navigate('WaecScreen');
          break;
        case 3:
          navigation.navigate('NecoScreen');
          break;
        case 4:
          navigation.navigate('UtmeScreen');
          break;
      }
    } else if (type === 'quick') {
      switch (id) {
        case 1:
          navigation.navigate('FlashCardScreen');
          break;
        case 2:
          navigation.navigate('BookmarkedScreen');
          break;
        case 3:
          navigation.navigate('LeaderBoardScreen');
          break;
        case 4:
          navigation.navigate('SubscribeScreen');
          break;
      }
    }
  };

  useEffect(() => {
    // ----- Fetch News -----
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          'https://news.google.com/rss/search?q=jamb+OR+waec+OR+neco+OR+post+utme',
          { responseType: 'text' }
        );

        const parser = new XMLParser({
          ignoreAttributes: false,
          ignoreDeclaration: true,
          parseTagValue: true,
          trimValues: true,
        });
        const result = parser.parse(res.data);
        const items: any[] = result.rss?.channel?.item ?? [];

        const formatted: NewsItem[] = items.map((i: any, index: number) => {
          let imageSource: ImageSourcePropType | { uri: string } = getRandomExamImage();
          if (i.enclosure?.url) imageSource = { uri: i.enclosure.url };
          else if (i['media:content']?.url) imageSource = { uri: i['media:content'].url };

          return {
            id: index,
            title: i.title ?? 'No title',
            date: i.pubDate ?? 'No date',
            link: i.link ?? '',
            image: imageSource,
          };
        });

        setNewsItems(formatted);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    // ----- Fetch Events -----
    const fetchEvents = async () => {
      try {
        const now = new Date();
        const snapshot = await db.collection('events').get();

        if (snapshot.empty) {
          setUpcomingEvents([
            { id: 0, title: 'No upcoming events', date: '', link: '', image: getRandomExamImage(), eventDate: null },
          ]);
          return;
        }

        const firebaseEvents: EventItem[] = snapshot.docs
          .map((doc, index) => {
            const data = doc.data() as FirestoreEvent;

            // ----- Safe eventDate parsing -----
            let eventDate: Date | null = null;
            if (data.eventDate) {
              if (typeof data.eventDate.toDate === 'function') {
                eventDate = data.eventDate.toDate();
              } else if (typeof data.eventDate === 'string') {
                const d = new Date(data.eventDate);
                if (!isNaN(d.getTime())) eventDate = d;
              } else if (data.eventDate && typeof data.eventDate.seconds === 'number') {
                eventDate = new Date(data.eventDate.seconds * 1000);
              }
            }

            return {
              id: index,
              title: data.title ?? 'No Title',
              date: data.date ?? '',
              link: data.link ?? '',
              image: data.image ? { uri: data.image } : getRandomExamImage(),
              eventDate,
              content: data.content ?? '',
            };
          })
          .filter((e: EventItem) => e.eventDate && e.eventDate >= now)
          .sort((a: EventItem, b: EventItem) => a.eventDate!.getTime() - b.eventDate!.getTime())
          .slice(0, 10);

        setUpcomingEvents(
          firebaseEvents.length
            ? firebaseEvents
            : [{ id: 0, title: 'No upcoming events', date: '', link: '', image: getRandomExamImage(), eventDate: null }]
        );
      } catch (err: any) {
        setUpcomingEvents([
          { id: 0, title: `Error fetching events: ${err.message}`, date: '', link: '', image: getRandomExamImage(), eventDate: null },
        ]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchNews();
    fetchEvents();
  }, []);

  // ----- Render -----
  return (
    <Block flex={1} style={styles.container}>
      {/* Header */}
      <Block style={[styles.header, { marginTop: insets.top, paddingVertical: RS(16) }]} align="center" justify="center">
        <Text style={styles.headerTitle}>Exam Hub</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: RS(20), top: RS(16) }}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + RS(80) }]}
      >
        {/* CBT Simulator */}
        <Block style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CBT Simulator</Text>
        </Block>

        <Block style={styles.menuRow}>
          {cbtItems.map((item: MenuItem) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.7} onPress={() => handleMenuPress(item.id, 'cbt')}>
              <Block style={styles.menuIconCircle}>
                {item.iconType === 'svg' ? (
                  <SvgIcon name={item.icon} size={28} />
                ) : (
                  <Image source={item.icon} style={styles.menuImage} resizeMode="contain" />
                )}
              </Block>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Quick Links */}
        <Block style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
        </Block>

        <Block style={styles.menuRow}>
          {quickLinks.map((item: MenuItem) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.7} onPress={() => handleMenuPress(item.id, 'quick')}>
              <Block style={styles.menuIconCircle}>
                {item.iconType === 'svg' ? (
                  <SvgIcon name={item.icon} size={28} />
                ) : (
                  <Image source={item.icon} style={styles.menuImage} resizeMode="contain" />
                )}
              </Block>
              <Text style={styles.quickText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Block>

        {/* Upcoming Events */}
        <Block style={styles.pastHeader}>
          <Text style={styles.pastTitle}>Upcoming Events</Text>
          <Text size={12} color="#2F80ED">View All</Text>
        </Block>

        {eventsLoading ? (
          <ActivityIndicator size="large" color="#2F80ED" style={{ marginVertical: 20 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.newsRow} style={styles.newsContainer}>
            {upcomingEvents.map((item: EventItem) => (
              <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.85} onPress={() => navigation.navigate('EventDetailScreen', { event: item })}>
                <Block style={styles.newsBody}>
                  <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                  {/* --- Updated date display --- */}
                <Block
  row
  align="center"
  style={{
    borderWidth: 1,
    borderColor: palette.blue,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    alignSelf: 'flex-start',
  }}
>
  <SvgIcon name="calender" size={15}color={palette.blue} />
  
  <Text style={[styles.newsMeta, { marginLeft: 6 }]}>
    {item.eventDate
      ? item.eventDate.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : item.date || 'Date not available'}
  </Text>
</Block>
                </Block>
                <Block style={styles.newsImageWrapper}>
                  <Image source={item.image} style={styles.newsImageLogo} />
                </Block>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* News */}
        <Block style={styles.pastHeader}>
          <Text style={styles.pastTitle}>News</Text>
          <Text size={12} color="#2F80ED">View All</Text>
        </Block>

        {loading ? (
          <ActivityIndicator size="large" color="#2F80ED" style={{ marginVertical: 20 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.newsRow} style={styles.newsContainer}>
            {newsItems.map((item: NewsItem) => (
              <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.85} onPress={() => navigation.navigate('WebViewScreen', { url: item.link })}>
                <Block style={styles.newsBody}>
                  <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.newsMeta}>
  {(() => {
    if (!item.date) return 'Date not available';
    const d = new Date(item.date);
    if (isNaN(d.getTime())) return item.date; // fallback if parsing fails
    return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  })()}
</Text>
                </Block>
                <Block style={styles.newsImageWrapper}>
                  <Image source={item.image} style={styles.newsImageLogo} />
                </Block>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </Block>
  );
};

export default ExamHubScreen;