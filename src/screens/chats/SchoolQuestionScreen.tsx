import React, { useEffect, useState, useMemo } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';

import { Block, Text } from '@components';
import { palette, family } from '@theme';
import { styles } from './styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { db } from '../../config/firebase';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FilterBottomSheet from './FilterBottomSheet';


/* ================= TYPES ================= */

type Question = {
  id: string;
  question: string;
  userName: string;
  institution?: string;
  answers?: number;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

type RootStackParamList = {
  AskQuestionScreen: undefined;
  AnswerQuestionScreen: {
    question: Question;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


/* ================= COMPONENT ================= */

const SchoolBasedQuestion = () => {

  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    questionType: 'all',
    sortBy: 'newest',
  });


  /* ================= FIRESTORE ================= */

  useEffect(() => {

    const unsubscribe = db
      .collection("questions")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {

          const list: Question[] = snapshot.docs.map(
            (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({
              id: doc.id,
              ...(doc.data() as Omit<Question, 'id'>),
            })
          );

          setQuestions(list);

        }
      );

    return () => unsubscribe();

  }, []);


  /* ================= SEARCH (DEBOUNCE) ================= */

  useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(handler);

  }, [searchText]);


  /* ================= FILTER LOGIC ================= */

  const filteredQuestions = useMemo(() => {

    let data = [...questions];

    // SEARCH
    if (debouncedSearch.trim()) {
      data = data.filter(item =>
        item.question?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.userName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.institution?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // QUESTION TYPE
    if (activeFilters.questionType === 'unanswered') {
      data = data.filter(item => !item.answers || item.answers === 0);
    }

    if (activeFilters.questionType === 'recent') {
      data = data.filter(item => (item.answers || 0) > 0);
    }

    // SORT
    if (activeFilters.sortBy === 'newest') {
      data.sort((a, b) =>
        (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
    }

    if (activeFilters.sortBy === 'old') {
      data.sort((a, b) =>
        (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)
      );
    }

    if (activeFilters.sortBy === 'liked') {
      data.sort((a, b) =>
        (b.answers || 0) - (a.answers || 0)
      );
    }

    return data;

  }, [debouncedSearch, questions, activeFilters]);


  /* ================= UI ================= */

  return (

    <Block flex={1} style={{ backgroundColor: '#F9F9F9' }}>

      <StatusBar barStyle="dark-content" />

      {/* HEADER */}

      <Block
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: '#FFF',
        }}
      >

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Block style={styles.circleBtn}>
            <Text size={18}>←</Text>
          </Block>
        </TouchableOpacity>

        <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Block style={styles.schoolIcon}>
            <Text color="#4CAF50">🏫</Text>
          </Block>

          <Text size={18} font={family.Bold} style={{ marginLeft: 10 }}>
            School Based Question
          </Text>
        </Block>

        <Block style={{ flexDirection: 'row', alignItems: 'center' }}>

          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Block style={styles.circleBtn}>
              <Text>≡</Text>
            </Block>
          </TouchableOpacity>

          <Block width={10} />

          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Block style={styles.circleBtn}>
              <Text>🔍</Text>
            </Block>
          </TouchableOpacity>

        </Block>

      </Block>


      {/* SEARCH */}

      {showSearch && (
        <Block style={{ padding: 16, backgroundColor: '#FFF' }}>
          <TextInput
            placeholder="Search questions..."
            value={searchText}
            onChangeText={setSearchText}
            style={{
              backgroundColor: '#F2F2F2',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          />
        </Block>
      )}


      {/* QUESTIONS */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >

        <Block style={{ padding: 16 }}>

          {filteredQuestions.length === 0 && (
            <Block style={{ alignItems: 'center', marginTop: 40 }}>
              <Text color={palette.grey}>No results found</Text>
            </Block>
          )}

          {filteredQuestions.map((item) => (

            <Block key={item.id} style={styles.card}>
              <Text color={palette.grey} size={13}>
                Asked a Question
              </Text>

              <Block style={{ flexDirection: 'row', marginTop: 10 }}>
                <Block style={styles.avatar} />

                <Block style={{ marginLeft: 10 }}>
                  <Text font={family.Bold}>{item.userName}</Text>

                  <Text>
                    {item.createdAt?.toDate?.().toLocaleString() || ''}
                  </Text>
                </Block>
              </Block>

              <Text size={14} style={{ marginTop: 12 }}>
                {item.question}
              </Text>

              {item.institution && (
                <Block style={[{ marginTop: 10 }, styles.schoolTag]}>
                  <Text color="#009688">{item.institution}</Text>
                </Block>
              )}

              <Block
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15
                }}
              >

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AnswerQuestionScreen', { question: item })
                  }
                >
                  <Block style={styles.answerBtn}>
                    <Text color="#C62828" font={family.Bold}>
                      Answer This
                    </Text>
                  </Block>
                </TouchableOpacity>

                <Block style={styles.answerCount}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AnswerQuestionScreen', { question: item })
                    }
                  >
                    <Text>✨ {item.answers || 0} Answers</Text>
                  </TouchableOpacity>
                </Block>

              </Block>
            </Block>

          ))}

        </Block>

        {/* BOTTOM BUTTON */}
<Block
  style={{
    position: 'absolute',
    bottom: insets.bottom + 16,
    left: 16,
    right: 16,
    zIndex: 10,
  }}
>
  <TouchableOpacity
    onPress={() => navigation.navigate('AskQuestionScreen')}
    style={{
      backgroundColor: palette.black,
      paddingVertical: 14,
      borderRadius: 25,
      alignItems: 'center',
    }}
  >
    <Text color="#FFF" font={family.Bold} size={16}>
      Ask a Question
    </Text>
  </TouchableOpacity>
</Block>

      </ScrollView>

      


      {/* FILTER */}

      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        activeFilters={activeFilters}
        onApply={(filters) => setActiveFilters(filters)}
      />

    </Block>
  );
};

export default SchoolBasedQuestion;