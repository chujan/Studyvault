import React, { useState } from 'react';
import {
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Block, Text } from '@components';
import { palette, family } from '@theme';
import { ChessPieces, DustBin, Numeric } from '@images/home';
import { styles as homeStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { SvgIcon } from '../../components/svg-icon';

const tabs = ['Popular', 'New', 'All'];

export default function BrainGamesScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Popular');

  const games = [
    { id: 1, title: 'Puzzle', image: ChessPieces, type: 'Popular' },
    { id: 2, title: 'Sort the Trash', image: DustBin, type: 'New' },
    { id: 3, title: 'Ancient Numbers', image: Numeric, type: 'Popular' },
  ];

  const filteredGames =
    activeTab === 'All'
      ? games
      : games.filter(game => game.type === activeTab);

  return (
    <Block style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.white} />

      {/* ===== Header ===== */}
      <Block
  row
  align="center"
  justify="space-between"
  paddingHorizontal={20}
  style={{ marginBottom: 40 }}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="arrow-left" size={15} />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontFamily: family.SemiBold, color: palette.black }}>
          Brain Games
        </Text>

        <Block style={{ width: 24 }} />
      </Block>

      {/* ===== Tabs ===== */}
      <Block
        row
        justify="space-between"
        align="flex-end"
       
        style={{
          borderBottomWidth: 2,
          
          borderColor: palette.borderLight,
          marginBottom: 20,
        }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
           <TouchableOpacity
  key={tab}
  style={{
    flex: 1,
    alignItems: 'center',
    marginLeft: tab === 'Popular' ? -19 : 0, 
  }}
  onPress={() => setActiveTab(tab)}>

              <Block
                align="center"
                style={{
                  borderBottomWidth: isActive ? 2.5 : 0,
                  borderBottomColor: palette.blue,
                  paddingBottom: 10,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: isActive ? palette.blue : '#9E9E9E',
                  }}>
                  {tab}
                </Text>
              </Block>
            </TouchableOpacity>
          );
        })}
      </Block>

      {/* ===== Games List ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {filteredGames.map(game => (
          <Block
            key={game.id}
            style={{
              backgroundColor: palette.white,
              borderRadius: 18,
              marginBottom: 16,
              padding: 14,
              borderWidth: 1,
              borderColor: '#E6E8EC',
            }}>
            <Image
              source={game.image}
              style={{
                width: '100%',
                height: 140,
                borderRadius: 14,
                resizeMode: 'cover',
                marginBottom: 12,
              }}
            />

            <Text style={{ fontSize: 14, fontFamily: 'SemiBold' }}>
              {game.title}
            </Text>

            <Block
  row
  align="center"
  style={{ marginTop: 4 }}>

              <Text style={{ fontSize: 12, opacity: 0.45, marginRight: 5 }}>
                ⭐ 4.7
              </Text>
              <Block
                style={{
                  width: 1,
                  height: 12,
                  backgroundColor: palette.ashGray,
                  marginHorizontal: 5,
                }}
              />
              <Text style={{ fontSize: 12, color: palette.ashGray }}>
                Brain games
              </Text>
            </Block>
          </Block>
        ))}
      </ScrollView>
    </Block>
  );
}
