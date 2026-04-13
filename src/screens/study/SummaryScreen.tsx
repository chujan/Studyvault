import React, { useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';
import { fetchNovelById, Novel } from '../../services/novelService';
import { palette } from '@components/theme';

// ---------------- Route Params Type ----------------
type SummaryScreenRouteProp = RouteProp<
  { params: { novelId: string; image: ImageSourcePropType } },
  'params'
>;

export default function SummaryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<SummaryScreenRouteProp>();

  const { novelId, image } = route.params;

  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ---------------- Fetch Novel ----------------
  useEffect(() => {
    const loadNovel = async () => {
      const response = await fetchNovelById(novelId);
      setNovel(response);
      setLoading(false);
    };

    loadNovel();
  }, [novelId]);

  // ---------------- Loading State ----------------
  if (loading) {
    return (
      <Block flex={1} justify="center" align="center">
        <Text>Loading...</Text>
      </Block>
    );
  }

  // ---------------- Not Found ----------------
  if (!novel) {
    return (
      <Block flex={1} justify="center" align="center">
        <Text>No novel found</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: RS(16) }}
        >
          <Text style={{ color: palette.blue }}>Go Back</Text>
        </TouchableOpacity>
      </Block>
    );
  }

  // ---------------- Main UI (UNCHANGED DESIGN) ----------------
  return (
    <Block flex={1} style={[styles.container, { backgroundColor: '#F5F5F5' }]}>

      {/* Header */}
      <Block
        style={[
          styles.header,
          { marginTop: insets.top, paddingVertical: RS(16) },
        ]}
        align="center"
        justify="center"
      >
        <Text style={styles.headerTitle}>Novels</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: RS(20),
            top: RS(16),
          }}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
      </Block>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RS(140),
          paddingHorizontal: RS(16),
        }}
      >
        {/* Novel Image */}
        <Image
          source={image}
          style={{
            width: '100%',
            height: RS(200),
            borderRadius: RS(12),
            marginBottom: RS(16),
          }}
          resizeMode="cover"
        />

        {/* Title */}
        <Text
          style={{
            fontSize: RS(16),
             textAlign: 'center',
            color: palette.black,
            fontWeight: '600',
            
          }}
        >
          {novel.title}
        </Text>

        <Text
          style={{
            fontSize: RS(14),
            color: palette.blue,
             marginTop: RS(15),
            fontWeight: '600',
          }}
        >
         Summary
        </Text>

        {/* Comprehensive Summary */}
        <Text
          style={{
            fontSize: RS(14),
            color: palette.black
            ,
            fontWeight: '400',
            marginTop: RS(15),
          }}
        >
          {novel.comprehensive_summary}
        </Text>

        {/* Chapters Title */}
       <Block style={{ alignSelf: 'flex-start', paddingHorizontal: RS(12), paddingVertical: RS(6), borderRadius: RS(20), borderWidth: 1, borderColor: palette.cardBorder, backgroundColor: '#FFF' , marginTop: RS(20) }}>
                 <Text size={14} style={{ marginBottom: RS(4) , fontWeight: '600',}}>
                  Chapter
                 </Text>
               </Block>

        {/* Chapters List */}
        {/* Chapters List - Grouped Style */}
<Block style={{ marginTop: RS(12), borderRadius: RS(8), overflow: 'hidden',  }}>
  {novel.chapters.map((chapter, index) => (
    <TouchableOpacity
      key={chapter.chapter}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: RS(16),
        paddingHorizontal: RS(16),
       
       
         backgroundColor: '#FFF' 
       
      }}
      onPress={() => {
        navigation.navigate('ChapterSummaryScreen', {
      chapterTitle: novel.title,
      chapterNumber: chapter.chapter,
      
      chapterContent: chapter.summary, 
    });
       
      }}
    >
      <Text style={{ fontSize: RS(14), fontWeight: '400', color: palette.black }}>
        {chapter.title}
      </Text>
      <SvgIcon name="arrow-right" size={28}  />
    </TouchableOpacity>
  ))}
</Block>

        
        
      </ScrollView>
    </Block>
  );
}
