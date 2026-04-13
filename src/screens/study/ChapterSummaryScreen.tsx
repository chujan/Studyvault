import React, { useEffect, useState } from 'react';
import { ScrollView , TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';

import { palette } from '@components/theme';
type ChapterScreenRouteProp = RouteProp<
  { params: { chapterTitle: string; chapterContent: string, chapterNumber: string } },
  'params'
>;
export default function ChapterSummaryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<ChapterScreenRouteProp>();

  const { chapterTitle, chapterContent, chapterNumber } = route.params;

  return (
    <Block flex={1} style={[styles.container, { backgroundColor: '#F5F5F5' }]}>
      {/* Header */}
      <Block
        style={[styles.header, { marginTop: insets.top, paddingVertical: RS(16) }]}
        align="center"
        justify="center"
      >
        <Text style={styles.headerTitle}>{chapterTitle}</Text>

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

      {/* Chapter Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: RS(16), paddingBottom: RS(140) }}
      >
        <Block style={{ alignSelf: 'flex-start', paddingHorizontal: RS(12), paddingVertical: RS(6), borderRadius: RS(20), borderWidth: 1, borderColor: palette.cardBorder, backgroundColor: '#FFF' , marginTop: RS(20) }}>
                         <Text size={14} style={{ marginBottom: RS(4) , fontWeight: '600',}}>
                          Chapter {chapterNumber}
                         </Text>
                       </Block>

                        <Block style={[styles.Card, {marginTop: RS(20)}]}>
                                 <Block row align="center" justify="space-between">
                                   <Text style={styles.newsTitle}>
                                     This is only a summary to help with revision, so candidates should ensure they read and understand the entire novel before the exams.
                                   </Text>
                       
                                  
                                 </Block>
                               </Block>
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
                       
       <Block style={{ marginTop: RS(20) }}>
  <Text
    style={{
      fontSize: RS(14),
      color: palette.black,
      lineHeight: RS(22),
    }}
  >
    {chapterContent}
  </Text>
</Block>

      </ScrollView>
    </Block>
  );
}