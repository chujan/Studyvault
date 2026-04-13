import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RS } from '@helpers';
import { palette } from '@theme';
import { db, firebaseAuth } from '../../config/firebase';

const ExamHistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [examData, setExamData] = useState<any[]>([]);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (!user) return;

   
    const unsubscribe = db
      .collection('examHistory')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          if (!snapshot) return; // safeguard
          const data = snapshot.docs.map(doc => {
            const item = doc.data();

            return {
              id: doc.id,
              title: item.subjects || 'Unknown',
              type: item.examType || 'CBT',
              date: item.createdAt
                ? new Date(item.createdAt.toDate()).toLocaleDateString()
                : '',
              score: `${item.score || 0}%`,
              time: `${Math.floor((item.timeSpentInSeconds || 0) / 60)} min`,
              sent: false,
            };
          });

          setExamData(data);
        },
        error => {
          console.log('Firestore onSnapshot error:', error);
        },
      );

    return () => unsubscribe(); // cleanup listener
  }, []);

  const renderItem = (item: any) => (
    <Block key={item.id} style={{ marginBottom: RS(20) }}>
      <Block row justify="space-between" align="flex-start">
        <Block flex={1} style={{ paddingRight: RS(10) }}>
          <Text size={16} color={palette.black}>
            {item.title}
          </Text>
          <Block row align="center" style={{ marginTop: RS(6) }}>
            {item.type ? (
              <>
                <Text size={13} color={palette.grayScale2}>
                  {item.type}
                </Text>
                <Text size={13} color={palette.grey2} style={{ marginHorizontal: 6 }}>
                  •
                </Text>
              </>
            ) : null}
            <Text size={13} color={palette.grey2}>
              {item.date}
            </Text>
          </Block>
        </Block>
        <Block align="flex-end">
          <Text size={20} bold color={palette.black}>
            {item.score}
          </Text>
          <Text size={13} color={palette.grey2}>
            {item.time}
          </Text>
        </Block>
      </Block>

      <Block align="flex-end" style={{ marginTop: RS(12) }}>
        <TouchableOpacity>
          <Block
            row
            align="center"
            justify="center"
            radius={RS(20)}
            color={item.sent ? '#E7A39D' : '#C8160D'}
            style={{ paddingVertical: RS(10), paddingHorizontal: RS(20) }}
          >
            <Text size={14} bold color={palette.white} style={{ marginRight: RS(6) }}>
              {item.sent ? 'Sent Online' : 'Send Online'}
            </Text>
            <SvgIcon name="note" size={16} color={palette.white} />
          </Block>
        </TouchableOpacity>
      </Block>

      <Block height={1} color={palette.grey2} style={{ marginTop: RS(20) }} />
    </Block>
  );

  return (
    <Block flex={1} color={palette.white}>
      {/* HEADER */}
      <Block
        row
        align="center"
        justify="space-between"
        style={{ paddingHorizontal: RS(5), marginBottom: RS(20), marginTop: insets.top }}
      >
        <Block row align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Block align="center" justify="center" style={{ height: 40, width: 40, marginRight: RS(12) }}>
              <SvgIcon name="arrow-left" size={15} />
            </Block>
          </TouchableOpacity>
          <Text size={22} bold>
            Exam History
          </Text>
        </Block>
        <TouchableOpacity>
          <Block
            style={{
              paddingHorizontal: RS(14),
              paddingVertical: RS(8),
              borderRadius: RS(12),
              borderWidth: 1,
              borderColor: palette.grayScale2,
            }}
          >
            <Text size={13}>Clear all Exam History</Text>
          </Block>
        </TouchableOpacity>
      </Block>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: RS(16) }}>
        {examData.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: RS(40) }}>No exam history yet</Text>
        )}
        {examData.map(renderItem)}
      </ScrollView>
    </Block>
  );
};

export default ExamHistoryScreen;