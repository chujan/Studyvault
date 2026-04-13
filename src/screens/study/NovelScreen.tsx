import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { Block, Text, SvgIcon } from '@components';
import { RS } from '@helpers';
import { styles } from './styles';
import { Lekki, SweetSixteen, LionBack, LionJewel } from '@assets/images';
import { palette } from '@components/theme';

// ---------------- NovelCard Props ----------------
type NovelCardProps = {
  title: string;
  image: ImageSourcePropType;
  subject: string;
   exam: string[];
   onSummaryPress?: () => void; 
  onPastQuestionsPress?: () => void;
 
};


const NovelCard: React.FC<NovelCardProps> = ({
  title,
  image,
  subject,
  exam,
   onSummaryPress,
  onPastQuestionsPress,
  
}) => (

  
    <Block
      row
      style={{
        borderWidth: 1,
        borderColor: '#E6E8EC',
        borderRadius: RS(10),
         marginTop: RS(18),
        padding: RS(12),
        backgroundColor: palette.white,
      }}
    >
      {/* Image on the left */}
      <Image
        source={image}
        style={{
          width: RS(60),
          height: RS(80),
          borderRadius: RS(6),
          marginRight: RS(12),
        }}
        resizeMode="cover"
      />

      {/* Right side: Title + Buttons */}
      <Block flex={1}>
        {/* Title */}
       {/* Title */}
<Text
  style={{
    fontSize: RS(14),
    color: palette.black,
    fontWeight: '600', // Medium font weight
  }}
>
  {title}
</Text>


         <Block row style={{ marginTop: RS(12) }}>
  {/* Red Container */}
  <Block
    style={{
      backgroundColor: '#D6F0FF',
      paddingHorizontal: RS(10),
      paddingVertical: RS(4),
      borderRadius: RS(20),
      marginRight: RS(8),
    }}
  >
    <Text
      fontSize={RS(12)}
      fontWeight="400"
      style={{ color: palette.blue }}
    >
       {subject}
    </Text>
  </Block>

  {/* Yellow Container */}
  <Block row>
  {exam.map((item, index) => (
    <Block
      key={index}
      style={{
        backgroundColor: '#DFFFE0',
        paddingHorizontal: RS(10),
        paddingVertical: RS(4),
        borderRadius: RS(20),
        marginRight: RS(6),
      }}
    >
      <Text
        fontSize={RS(12)}
        fontWeight="400"
        style={{ color: palette.greenText }}
      >
        {item}
      </Text>
    </Block>
  ))}
</Block>

</Block>


       

        {/* Buttons row BELOW title with marginTop */}
        <Block row justify="space-between" style={{ marginTop: RS(20) }}>
          {/* Summary Button */}
          <TouchableOpacity
            style={{
              flex: 0.48,
              borderWidth: 1,
                borderColor: '#E6E8EC',
              paddingVertical: RS(8),
              borderRadius: RS(20),
              alignItems: 'center',
            }}
            onPress={onSummaryPress}
          >
            <Text style={{ color: palette.blue,  fontWeight: '600', fontSize: RS(12) }}>Summary</Text>
          </TouchableOpacity>

          {/* Past Questions Button */}
          <TouchableOpacity
            style={{
              flex: 0.48,
                borderWidth: 1,
              borderColor: '#E6E8EC',
              paddingVertical: RS(8),
              borderRadius: RS(20),
              alignItems: 'center',
            }}
            onPress={onPastQuestionsPress} 
          >
            <Text style={{ color: palette.blue,  fontWeight: '600', fontSize: RS(12) }}>Past Questions</Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
 
);


// ---------------- Novel Type ----------------
type Novel = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  subject: 'ENG' | 'LIT';
 exam: ('WAEC' | 'NECO' | 'JAMB')[];

};


const NovelScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const [searchText, setSearchText] = useState<string>('');

  // Sample novels array
  const novels: Novel[] = [
  {
    id: '1',
    title: 'Lekki Headmaster',
    image: Lekki,
    subject: 'ENG',
    exam: ['JAMB'],   
  },
  {
    id: '2',
    title: 'Sweet Sixteen',
    image: SweetSixteen,
    subject: 'ENG',
    exam: ['JAMB'],   
  },
  {
    id: '3',
    title: 'Lion and the Jewel (Back)',
    image: LionBack,
    subject: 'LIT',
    exam: ['NECO', 'WAEC'],   
  },
  {
    id: '4',
    title: 'Lion and the Jewel',
    image: LionJewel,
    subject: 'LIT',
    exam: ['WAEC'],   
  },
];


  // Filter novels based on search input
  const filteredNovels = novels.filter(novel =>
    novel.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Block flex={1} style={styles.container}>
      {/* Header */}
      <Block
        style={[styles.header, { marginTop: insets.top, paddingVertical: RS(16) }]}
        align="center"
        justify="center"
      >
        <Text style={styles.headerTitle}>Novels</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: RS(20), top: RS(16) }}
        >
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>
      </Block>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RS(140), paddingHorizontal: RS(16) }}
      >
        {/* Info Card */}
        <Block style={styles.newsCard}>
          <Block row align="center" justify="space-between">
            <Text style={styles.newsTitle}>
              Study summaries and Questions{"\n"}for all recommended exam novels
            </Text>

            <Block
              style={{
                backgroundColor: palette.borderColor,
                padding: RS(8),
                borderRadius: RS(25),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgIcon name="book" size={20} />
            </Block>
          </Block>
        </Block>

        {/* Search Field */}
        <Block style={{ marginVertical: RS(16) }}>
          <Block
            row
            align="center"
            style={{
              borderWidth: 1,
              borderColor: palette.grayScale4,
              borderRadius: RS(10),
              paddingHorizontal: RS(12),
              paddingVertical: RS(4),
            }}
          >
            <SvgIcon
              name="search"
              size={18}
              color={palette.ashText}
              style={{ marginRight: RS(8) }}
            />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search novels..."
              placeholderTextColor={palette.ashText}
              style={{
                flex: 1,
                fontSize: RS(14),
                color: palette.ashText,
                paddingVertical: RS(12),
              }}
            />
          </Block>
        </Block>

        {/* Render Novels */}
        {filteredNovels.map(novel => (
          <NovelCard
            key={novel.id}
            title={novel.title}
            image={novel.image}
             subject={novel.subject}
            exam={novel.exam}
          onSummaryPress={() =>
  navigation.navigate('SummaryScreen', {
    novelId: novel.id,
    image: novel.image,
  })
}


    onPastQuestionsPress={() =>
      navigation.navigate('NovelPastQuestionScreen', { novelId: novel.id })
    }
          />
        ))}
      </ScrollView>
    </Block>
  );
};

export default NovelScreen;
