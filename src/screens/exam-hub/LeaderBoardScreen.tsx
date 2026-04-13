import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '@theme';
import { useNavigation } from '@react-navigation/native';
import { RS } from '@helpers';
import { styles } from './styles';
import { db } from '../../config/firebase';
import { BottomSheet, BottomSheetModalRefProps } from '@components/bottom-sheet';

/* ================= TYPES ================= */
type LeaderboardItem = {
  id: string;
  userId: string;
  username: string;
  examType: string;
  score: number;
  point: string;
  best: string;
  time: string;
  position: number;
};

/* ================= SEGMENTS ================= */
const filters = ['Challenge', 'JAMB', 'WAEC', 'NECO', 'CBT', 'Weekly', 'Daily'];

/* ================= COMPONENT ================= */
const Leaderboard: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [selectedFilter, setSelectedFilter] = useState('JAMB');
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null); // ✅ NEW
  const [users, setUsers] = useState<LeaderboardItem[]>([]);

  /* ================= BOTTOM SHEET ================= */
  const bottomSheetRef = useRef<BottomSheetModalRefProps>(null);

  const openSheet = () => {
    bottomSheetRef.current?.presentBottomSheet();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.dismissBottomSheet();
  };

  /* ===== REALTIME FETCH USERS FROM FIRESTORE ===== */
  useEffect(() => {
    let ref = db
      .collection('leaderboard')
      .where('examType', '==', selectedFilter.trim().toLowerCase());

    // ✅ APPLY WEEK FILTER IF SELECTED
    if (selectedWeek) {
      ref = ref.where('week', '==', selectedWeek);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setUsers([]);
          return;
        }

        let data: LeaderboardItem[] = snapshot.docs.map((doc) => {
          const d = doc.data() || {};

          return {
            id: doc.id,
            userId: d.userId,
            username: d.username || 'Unknown',
            examType: d.examType || selectedFilter,
            score: typeof d.score === 'number' ? d.score : 0,
            point: `${(d.percentage ?? 0).toFixed(2)}% from ${d.totalQuestions ?? 0} Qs`,
            best: `${Math.round(d.percentage ?? 0)}%`,
            time: `${d.timeSpentInSeconds ?? 0}s`,
            position: 0,
          };
        });

        data.sort((a, b) => b.score - a.score);

        data = data.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        setUsers(data);
      },
      () => setUsers([])
    );

    return () => unsubscribe();
  }, [selectedFilter, selectedWeek]); // ✅ UPDATED DEPENDENCY

  /* ===== RENDER CARD ===== */
  const renderCard = (item: LeaderboardItem) => {
    const isTop = item.position === 1;

    return (
      <Block
        key={item.id}
        style={{
          padding: 16,
          borderRadius: 16,
          marginBottom: 16,
          backgroundColor: isTop ? '#F6E7C1' : '#F2F2F2',
        }}
      >
        {/* HEADER */}
        <Block row justifyContent="space-between" alignItems="center">
          <Block row alignItems="center">
            <Block
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isTop ? '#FFD700' : '#DDD',
                marginRight: 8,
              }}
            >
              <Text>{item.position}</Text>
            </Block>

            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: 8,
              }}
            />

            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {item.username}
            </Text>
          </Block>

          <Block alignItems="flex-end">
            <Text style={{ fontSize: 12, color: '#888' }}>
              {item.examType} Score
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              {item.score}
            </Text>
          </Block>
        </Block>

        {/* STATS */}
        <Block style={{ marginTop: 12 }}>
          <Block style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff', marginBottom: 8 }}>
            <Text style={{ fontSize: 12 }}>
              Myschool Point <Text style={{ fontWeight: '700' }}>{item.point}</Text>
            </Text>
          </Block>

          <Block row justifyContent="space-between">
            <Block style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff', width: '48%' }}>
              <Text style={{ fontSize: 12 }}>
                Best Score <Text style={{ fontWeight: '700' }}>{item.best}</Text>
              </Text>
            </Block>

            <Block style={{ padding: 10, borderRadius: 20, backgroundColor: '#fff', width: '48%' }}>
              <Text style={{ fontSize: 12 }}>
                Time Adv <Text style={{ fontWeight: '700' }}>{item.time}</Text>
              </Text>
            </Block>
          </Block>
        </Block>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewHistoryScreen', {
              userId: item.userId,
              username: item.username,
              examType: selectedFilter,
            })
          }
        >
          <Block
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontWeight: '600' }}>View History</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  return (
    <Block flex={1} style={{ backgroundColor: palette.white }}>
      {/* HEADER */}
      <Block
        style={{
          marginTop: insets.top,
          paddingVertical: RS(16),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.headerTitle}>Leaderboard</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: RS(16) }}
        >
          <SvgIcon name="arrow-left" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openSheet}
          style={{ position: 'absolute', right: RS(16) }}
        >
          <SvgIcon name="calender" size={18} />
        </TouchableOpacity>
      </Block>

      {/* SEGMENTED CONTROL */}
      <Block
        style={{
          backgroundColor: '#E5E5E5',
          borderRadius: RS(30),
          padding: RS(4),
          marginHorizontal: RS(16),
          marginTop: RS(12),
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Block row>
            {filters.map((filter) => {
              const active = selectedFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  style={{
                    backgroundColor: active ? '#FFFFFF' : 'transparent',
                    paddingVertical: RS(10),
                    paddingHorizontal: RS(16),
                    borderRadius: RS(25),
                    alignItems: 'center',
                    marginRight: RS(6),
                  }}
                >
                  <Text weight={active ? '600' : '400'} color={active ? '#000' : '#777'}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Block>
        </ScrollView>
      </Block>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: RS(16) }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginVertical: 16 }}>
          {selectedFilter} Ranking
        </Text>

        {users.length > 0 ? (
          users.map(renderCard)
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No results yet.
          </Text>
        )}
      </ScrollView>

      {/* ================= BOTTOM SHEET ================= */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['55%']}>
        <Block
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: RS(20),
            borderTopRightRadius: RS(20),
          }}
        >
          <Block
            style={{
              paddingVertical: RS(16),
              borderBottomWidth: 1,
              borderBottomColor: '#E5E5E5',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              Select Week
            </Text>
          </Block>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={{ paddingHorizontal: RS(20) }}>
              {[
                'Week 16-2026',
                'Week 15-2026',
                'Week 14-2026',
                'Week 13-2026',
                'Week 12-2026',
                'Week 11-2026',
              ].map((week) => (
                <TouchableOpacity
                  key={week}
                  onPress={() => {
                    setSelectedWeek(week); // ✅ NOW WORKS
                    closeSheet();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: RS(18),
                    borderBottomWidth: 1,
                    borderBottomColor: '#F2F2F2',
                  }}
                >
                  <SvgIcon name="calender" size={20} color={palette.blue} />

                  <Text
                    style={{
                      marginLeft: RS(12),
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  >
                    {week}
                  </Text>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
        </Block>
      </BottomSheet>
    </Block>
  );
};

export default Leaderboard;