/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { palette } from '@theme';
import { db } from '../../config/firebase';

// ----- Types -----
type EventItem = {
  id: number;
  title: string;
  date: string;
  link: string;
  image: any;
  content?: string;
  eventDate: Date | null;
};

const EventDetails = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { event }: { event: EventItem } = route.params || {};
  const [discussionCount, setDiscussionCount] = useState(0);

  // Listen for real-time updates
  useEffect(() => {
    if (!event?.id) return;

    const unsubscribe = db
      .collection('discussions')
      .where('eventId', '==', event.id)
      .onSnapshot(
        snapshot => {
          setDiscussionCount(snapshot.size); // update count immediately
        },
        error => console.log(error)
      );

    return () => unsubscribe();
  }, [event?.id]);

  return (
    <Block flex={1} style={{ backgroundColor: '#fff', padding: 16 }}>
      
      {/* HEADER */}
      <Block
        row
        justify="space-between"
        align="center"
        style={[styles.header, { marginTop: insets.top }]}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        {/* Reminder Button */}
        <TouchableOpacity onPress={() => navigation.navigate('SetReminderScreen', { event })}>
          <Block
            row
            align="center"
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <SvgIcon name="bell" size={16} color={palette.blue} />
            <Text style={{ marginLeft: 6, color: palette.blue, fontWeight: 'bold' }}>
              Set Reminder
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* DATE */}
        <Block
          row
          align="center"
          style={{
            alignSelf: 'flex-start',
            marginTop: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            backgroundColor: '#f2f4ff',
          }}
        >
          <SvgIcon name="calender" size={15} color={palette.blue} />
          <Text style={{ marginLeft: 6, color: '#3b5bfd' }}>
            {event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : event?.date || 'Date not available'}
          </Text>
        </Block>

        {/* TITLE */}
        <Text style={{ marginTop: 16, fontSize: 22, fontWeight: 'bold', lineHeight: 30 }}>
          {event?.title || 'No Title'}
        </Text>

        {/* CONTENT */}
        <Text style={{ marginTop: 16, color: '#555', lineHeight: 24 }}>
          {event?.content || 'No details available for this event.'}
        </Text>

        <Text style={{ marginTop: 12, color: '#555', lineHeight: 24 }}>
          {event?.content || ''}
        </Text>

        <Text style={{ marginTop: 12, color: '#555', lineHeight: 24 }}>
          {event?.content || ''}
        </Text>
      </ScrollView>

      {/* FLOATING DISCUSSION BUTTON */}
      <Block style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DiscussionScreen', {
              eventId: event?.id,
              onNewDiscussion: () =>
                setDiscussionCount(prev => prev + 1), // update immediately
            })
          }
        >
          <Block
            row
            align="center"
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 30,
              backgroundColor: '#000',
            }}
          >
            <SvgIcon name="chats" size={15} color={palette.white} />
            <Text style={{ color: '#fff', marginLeft: 8, fontWeight: 'bold' }}>
              View Discussion
            </Text>

            <Block
              style={{
                marginLeft: 10,
                backgroundColor: '#fff',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 12 }}>{discussionCount}</Text>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default EventDetails;