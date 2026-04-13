import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home';
import ProfileScreen from '../../screens/profile';
import StudyScreen from '../../screens/study';

import ChatsScreen from '../../screens/chats';
import { SvgIcon } from '../../components/svg-icon';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          let isFilled = false;

          if (route.name === 'Home') {
            iconName = 'Home';
            isFilled = true;   // filled icon
          } else if (route.name === 'Profile') {
            iconName = 'Person';
            isFilled = true;   // filled icon
          } else if (route.name === 'Study') {
            iconName = 'notes';
            isFilled = false;  // outline icon
          } else if (route.name === 'Chats') {
            iconName = 'Chats';
            isFilled = false;  // outline icon
          }

          return (
            <SvgIcon
              name={iconName}
              size={size}
              color={color}            
              fill={isFilled ? color : undefined} 
            />
          );
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
