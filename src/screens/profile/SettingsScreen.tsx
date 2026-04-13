import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text, SvgIcon } from '@components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RS } from '@helpers';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { palette } from '@theme';

const settingsData = [
  { label: 'Updates', icon: 'refresh' },
  { label: 'Appearance', icon: 'sun' },
  { label: 'Notifications', icon: 'bell' },
  { label: 'Rate App', icon: 'star' },
  { label: 'Contact Us', icon: 'call' },
  { label: 'About App', icon: 'info' },
];

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <Block flex={1} color={palette.white} >
      {/* Header */}
       <Block
                row
                align="center"
                justify="center"
                paddingHorizontal={RS(20)}
                paddingVertical={RS(16)}
                style={[styles.header, { marginTop: insets.top }]}
              >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <SvgIcon name="arrow-left" size={15} />
                </TouchableOpacity>
                
              </Block>
      {/* Title */}
      

      {/* Options */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: RS(16),
          paddingTop: RS(20),
        }}
        showsVerticalScrollIndicator={false}

      >

        <Block
        style={{
          paddingHorizontal: RS(16),
          marginBottom: RS(30),
          
        }}
      >
        <Text size={RS(28)} bold>
          App Settings
        </Text>
      </Block>
        {settingsData.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8}>
            <Block
              row
              align="center"
              justify="space-between"
              color={'#E6E8EC'}
              style={{
                padding: RS(16),
                marginBottom: RS(12),
                borderRadius: RS(12),
                borderWidth: 1,
                borderColor: '#E6E8EC',
              }}
            >
              <Block row align="center">
                {/* Icon */}
                <SvgIcon name={item.icon} size={RS(24)} color={palette.black} />
                {/* Label */}
                <Text size={RS(16)} style={{ marginLeft: RS(12) }}>
                  {item.label}
                </Text>
              </Block>

              {/* Optional right arrow */}
              <SvgIcon name="arrow-right" size={RS(18)} color={palette.ghostGray} />
            </Block>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Block>
  );
};

export default SettingsScreen;