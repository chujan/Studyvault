/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RS } from '@helpers';
import { styles } from './styles';
import { palette } from '@theme';

const ReminderScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const loadReminder = async () => {
      const data = await AsyncStorage.getItem('REMINDER_ITEM');
      if (data) {
        setItem(JSON.parse(data));
      }
    };

    loadReminder();
  }, []);

  return (
    <Block
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
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
        <Text style={styles.headerTitle}>Reminder</Text>
      </Block>

      {/* Card */}
      <Block
        style={{
          marginTop: 20,
          marginHorizontal: 16,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#EAEAEA',
          padding: 12,
        }}
      >
        {/* Image */}
        <Block
          style={{
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Image
            source={
              typeof item?.image === 'string'
                ? { uri: item?.image }
                : item?.image
            }
            style={{
              width: '100%',
              height: 140,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />

          {/* Date Badge */}
          <Block
            row
            style={{
              position: 'absolute',
              bottom: 15,
              alignSelf: 'center',
              backgroundColor: '#F5F7FF',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#E0E6FF',
              alignItems: 'center',
            }}
          >
            <SvgIcon name="calender" size={14} color={palette.blue} />
            <Text
              style={{
                marginLeft: 6,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              {item?.date || '16 Apr, 2026'}
            </Text>
          </Block>
        </Block>

        {/* Title */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginTop: 28,
          }}
        >
          {item?.title || 'JAMB begins 2026 UTME'}
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 16,
            alignSelf: 'flex-start',
            borderWidth: 1,
            borderColor: '#DADADA',
            borderRadius: 25,
            paddingHorizontal: 16,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              marginRight: 6,
            }}
          >
            Reminder set
          </Text>

          <SvgIcon name="badge-check" size={15} color="#000" />
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default ReminderScreen;