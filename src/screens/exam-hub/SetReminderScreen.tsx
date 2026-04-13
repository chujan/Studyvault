/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

type EventItem = {
  id: number;
  title: string;
  date: string;
  link: string;
  image: any;
  content?: string;
  eventDate: Date | null;
};

const SetReminderScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { event }: { event: EventItem } = route.params || {};

  const [date, setDate] = useState<Date | null>(event?.eventDate || null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState(
    event?.eventDate
      ? new Date(event.eventDate).toISOString().split('T')[0]
      : ''
  );

  const formatDate = (d: Date | null) => {
    if (!d) return 'dd/mm/yyyy';
    return `${String(d.getDate()).padStart(2, '0')}/${String(
      d.getMonth() + 1
    ).padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <Block flex={1} style={{ padding: 16, backgroundColor: '#F7F7F7' }}>
      
      {/* HEADER */}
      <Block row align="center" style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Block
            align="center"
            justify="center"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#E5E5E5',
            }}
          >
            <Text>X</Text>
          </Block>
        </TouchableOpacity>
      </Block>

      {/* TITLE */}
      <Text size={20} bold style={{ marginBottom: 20, marginTop: 20 }}>
        Set Reminder
      </Text>

      {/* EVENT TITLE */}
      <Text size={14} color="#777" style={{ marginBottom: 20 }}>
        Set Reminder for: {event?.title || 'Unknown Event'}
      </Text>

      {/* DATE INPUT */}
      <Text size={14} bold style={{ marginBottom: 10 }}>
        Select Reminder Date
      </Text>

      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <Block
          row
          align="center"
          justify="space-between"
          style={{
            padding: 14,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#E5E5E5',
            backgroundColor: '#fff',
          }}
        >
          <Text color={date ? '#000' : '#999'}>
            {formatDate(date)}
          </Text>

          <SvgIcon name="calender" width={20} height={20} />
        </Block>
      </TouchableOpacity>

      {/* BUTTON */}
      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={async () => {
          if (!date) return;

          const reminderData = {
            id: event?.id,
            title: event?.title,
            image: event?.image,
            date: formatDate(date),
          };

          await AsyncStorage.setItem(
            'REMINDER_ITEM',
            JSON.stringify(reminderData)
          );

          navigation.goBack();
        }}
      >
        <Block
          align="center"
          style={{
            padding: 16,
            borderRadius: 30,
            backgroundColor: '#C30000',
          }}
        >
          <Text color="#fff" bold>
            Reminder Set
          </Text>
        </Block>
      </TouchableOpacity>

      {/* CALENDAR MODAL */}
      <Modal transparent visible={showCalendar} animationType="fade">
        <Block
          flex={1}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <Block
            style={{
              backgroundColor: '#EED9D4',
              borderRadius: 20,
              padding: 16,
            }}
          >
            <Text bold size={16} style={{ marginBottom: 10 }}>
              Select date
            </Text>

            <Calendar
              onDayPress={(day: any) => setSelected(day.dateString)}
              markedDates={{
                [selected]: {
                  selected: true,
                  selectedColor: '#C30000',
                },
              }}
              theme={{
                calendarBackground: '#EED9D4',
                textSectionTitleColor: '#000',
                selectedDayBackgroundColor: '#C30000',
                todayTextColor: '#C30000',
                arrowColor: '#C30000',
                monthTextColor: '#000',
                textDayFontWeight: '500',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '600',
              }}
            />

            <Block row justify="flex-end" style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Text style={{ marginRight: 20, color: '#C30000' }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (selected) {
                    setDate(new Date(selected));
                  }
                  setShowCalendar(false);
                }}
              >
                <Text bold style={{ color: '#C30000' }}>
                  OK
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

export default SetReminderScreen;