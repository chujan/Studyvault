import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../TabNavigator';
import BrainGamesScreen from '@screens/home/BrainGameScreen';
import ExamHubScreen from '@screens/exam-hub/ExamHubScreen';
import JambScreen from '@screens/exam-hub/JambScreen';
import PerformanceScreen from '@screens/exam-hub/PerformanceScreen';
import PracticeScren from '@screens/exam-hub/PracticeScreen';
import ViewPerformanceScren from '@screens/exam-hub/ViewPerformanceScreen';
import WaecScren from '@screens/exam-hub/WaecScreen';
import WaecPracticeScreen from '@screens/exam-hub/WaecPracticeScreen';
import NecoScreen from '@screens/exam-hub/NecoScreen';
import NecoPracticeScreen from '@screens/exam-hub/NecoPracticeScreen';
import UtmeScreen from '@screens/exam-hub/UtmeScreen';
import UtmePracticeScreen from '@screens/exam-hub/UtmePracticeScreen';




const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
       <Stack.Screen name="BrainGames" component={BrainGamesScreen}  options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="ExamHub" component={ExamHubScreen}  options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="Jamb" component={JambScreen}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="PracticeScreen" component={PracticeScren}  options={{
            headerShown: false,
          }}/>

           <Stack.Screen name="PerformanceScreen" component={PerformanceScreen}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="ViewPerformanceScreen" component={ViewPerformanceScren}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="WaecScreen" component={WaecScren}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="WaecPracticeScreen" component={WaecPracticeScreen}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="NecoScreen" component={NecoScreen}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="NecoPracticeScreen" component={NecoPracticeScreen}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="UtmeScreen" component={UtmeScreen}  options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="UtmePracticeScreen" component={UtmePracticeScreen}  options={{
            headerShown: false,
          }}/>

          


    </Stack.Navigator>
  );
}
