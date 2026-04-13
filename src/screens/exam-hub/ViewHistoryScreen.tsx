import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '@theme';
import { RS } from '@helpers';
import { db } from '../../config/firebase';

const ViewHistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { userId, username, examType } = route.params;

  const [examData, setExamData] = useState<any[]>([]);

  /* ================= FETCH EXAM HISTORY ================= */
  useEffect(() => {
  if (!userId || !examType) return;

  console.log('userId:', userId);
  console.log('examType:', examType);

  const ref = db
    .collection('users')
    .doc(userId)
    .collection('examHistory')
    // ✅ TEMP: remove filter to confirm data exists
    .orderBy('createdAt', 'desc')
    .limit(10);

  const unsubscribe = ref.onSnapshot(
    (snapshot) => {
      if (snapshot.empty) {
        console.log('❌ No history found');
        setExamData([]);
        return;
      }

      console.log('✅ History found:', snapshot.size);

      const data = snapshot.docs.map((doc) => {
        const d = doc.data();

        return {
          id: doc.id,
          subjects: d.subjects || '',
          type: d.examType || '',
          date: d.date || '',
          score: `${d.score ?? 0}%`,
          jambScore:
            d.examType === 'JAMB'
              ? `Score (${d.score ?? 0})`
              : null,
        };
      });

      setExamData(data);
    },
    (error) => {
      console.log('History fetch error:', error);
      setExamData([]);
    }
  );

  return () => unsubscribe();
}, [userId, examType]);
  return (
    <Block
      flex={1}
      style={{
        backgroundColor: palette.white,
        paddingTop: insets.top,
      }}
    >
      {/* HEADER */}
      <Block
        row
        alignItems="center"
        style={{
          paddingHorizontal: RS(16),
          marginTop: RS(10),
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Block
            style={{
              width: RS(40),
              height: RS(40),
              borderRadius: RS(20),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: palette.ghostGray,
            }}
          >
            <SvgIcon name="arrow-left" size={RS(18)} />
          </Block>
        </TouchableOpacity>
      </Block>

      {/* TITLE */}
      <Block
        style={{
          paddingHorizontal: RS(16),
          marginTop: RS(20),
        }}
      >
        <Text size={RS(22)} semibold color={palette.black}>
          {examType} Exam History
        </Text>
      </Block>

      {/* PROFILE CARD */}
      <Block
        row
        style={{
          marginTop: RS(20),
          marginHorizontal: RS(16),
          padding: RS(12),
          borderRadius: RS(12),
          borderWidth: 1,
          borderColor: palette.ghostGray,
          alignItems: 'center',
        }}
      >
        <Block
          style={{
            width: RS(40),
            height: RS(40),
            borderRadius: RS(20),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: RS(10),
          }}
        >
          <SvgIcon name="user" size={RS(20)} />
        </Block>

        <Block>
          <Text size={RS(16)} semibold>
            {username || 'User'}
          </Text>
          <Text size={RS(13)} color={palette.grey}>
            @{username || 'user'}
          </Text>
        </Block>
      </Block>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          style={{
            paddingHorizontal: RS(16),
            marginTop: RS(20),
          }}
        >
          <Text size={RS(16)} semibold style={{ marginBottom: RS(10) }}>
            Last 10 Exams
          </Text>

          {examData.length > 0 ? (
            examData.map((item, index) => (
              <Block key={item.id} style={{ marginBottom: RS(18) }}>
                <Block row style={{ justifyContent: 'space-between' }}>
                  
                  {/* LEFT */}
                  <Block flex={1}>
                    <Text size={RS(15)} semibold>
                      {index + 1} {item.subjects}
                    </Text>

                    <Block
                      row
                      style={{
                        marginTop: RS(4),
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        size={RS(12)}
                        color={palette.grey}
                        style={{ letterSpacing: 1 }}
                      >
                        {item.type}
                      </Text>

                      <Text
                        size={RS(12)}
                        color={palette.grey}
                        style={{ marginHorizontal: RS(6) }}
                      >
                        •
                      </Text>

                      <Text size={RS(12)} color={palette.grey}>
                        {item.date}
                      </Text>
                    </Block>
                  </Block>

                  {/* RIGHT */}
                  <Block style={{ alignItems: 'flex-end' }}>
                    {item.jambScore && (
                      <Text size={RS(13)} color={palette.grey}>
                        {item.jambScore}
                      </Text>
                    )}
                    <Text size={RS(18)} semibold>
                      {item.score}
                    </Text>
                  </Block>
                </Block>

                {/* DIVIDER */}
                <Block
                  style={{
                    height: 1,
                    backgroundColor: palette.ghostGray,
                    marginTop: RS(12),
                  }}
                />
              </Block>
            ))
          ) : (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: palette.grey,
              }}
            >
              No exam history yet.
            </Text>
          )}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ViewHistoryScreen;