import React, { useLayoutEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block, Text } from '@components';
import { palette } from '@theme';
import { SvgIcon } from '../../components/svg-icon';
import { styles } from './styles';

const MENU_ITEMS = [
  { label: 'Edit profile', icon: 'user' },
  { label: 'My Favorite', icon: 'favourite' },
  { label: 'Payment method', icon: 'wallet' },
  { label: 'Settings', icon: 'settings' },
  { label: 'Security', icon: 'security' },
  { label: 'Privacy policy', icon: 'privacy' },
  { label: 'Help Center', icon: 'help' },
  { label: 'Invite friends', icon: 'people' },
  { label: 'Sign out', icon: 'sign-out' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Profile',
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <Block style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
      >
        {/* Card */}
        <Block style={styles.cardContainer}>
          {/* Profile */}
          <Block style={styles.profileSection}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Shahib Hussain</Text>
            <Text style={styles.email}>shahibhussain482@gmail.com</Text>
          </Block>

          {/* Menu */}
          <Block style={styles.menuSection}>
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                  <Block style={styles.menuLeft}>
                    <Block style={styles.iconWrapper}>
                      <SvgIcon
                        name={item.icon}
                        width={15}
                        height={15}
                        color={palette.blue}
                      />
                    </Block>

                    <Text style={styles.menuText}>{item.label}</Text>
                  </Block>

                  <SvgIcon
                    name="arrow-right"
                    width={24}
                    height={28}
                    color="#C4C4C4"
                    style={styles.arrowRight}
                  />
                </TouchableOpacity>

                {index !== MENU_ITEMS.length - 1 && (
                  <Block style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}
