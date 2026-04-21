import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '../TabNavigator';
import BrainGamesScreen from '@screens/home/BrainGameScreen';
import ExamHubScreen from '@screens/exam-hub/ExamHubScreen';
import JambScreen from '@screens/exam-hub/JambScreen';
import PerformanceScreen from '@screens/exam-hub/PerformanceScreen';
import PracticeScreen from '@screens/exam-hub/PracticeScreen';
import ViewPerformanceScreen from '@screens/exam-hub/ViewPerformanceScreen';
import WaecScreen from '@screens/exam-hub/WaecScreen';
import WaecPracticeScreen from '@screens/exam-hub/WaecPracticeScreen';
import NecoScreen from '@screens/exam-hub/NecoScreen';
import NecoPracticeScreen from '@screens/exam-hub/NecoPracticeScreen';
import UtmeScreen from '@screens/exam-hub/UtmeScreen';
import UtmePracticeScreen from '@screens/exam-hub/UtmePracticeScreen';
import FlashCardScreen from '@screens/exam-hub/FlashCardScreen';
import FlashStudyScreen from '@screens/exam-hub/FlashStudyScreen';
import BookmarkedScreen from '@screens/exam-hub/BookmarkedScreen';
import AnalysisScreen from '../../screens/profile/AnalysisScreen';
import NovelScreen from '../../screens/study/NovelScreen';
import SummaryScreen from '../../screens/study/SummaryScreen';
import ChapterSummaryScreen from '../../screens/study/ChapterSummaryScreen';
import NovelPastQuestionScreen from '../../screens/study/NovelPastQuestionScreen';
import PastQuestionScreen from '../../screens/study/PastQuestionScreen';
import JambSyllabusScreen from '../../screens/study/JambSyllabusScreen';
import JambSyllabusDetailScreen from '../../screens/study/JambSyllabusDetailScreen';
import PastQuestionPracticeScreen from '../../screens/study/PastQuestionPracticeScreen';
import JambBrochureScreen from '../../screens/study/JambBrochureScreen';
import JambBrochureDetailScreen from '../../screens/study/JambBrochureDetailScreen';
import CoursesDetailScreen from '../../screens/study/CoursesDetailScreen';
import SchoolQuestionScreen from '@screens/chats/SchoolQuestionScreen';
import AskQuestionScreen from '@screens/chats/AskQuestionScreen';
import AnswerQuestionScreen from '@screens/chats/AnswerQuestionScreen';
import GroupDetailScreen from '@screens/chats/GroupDetailScreen';
import AllGroupScreen from '@screens/chats/AllGroupScreen';
import RepliesScreen from '@screens/chats/RepliesScreen';
import CreateGroupScreen from '@screens/chats/CreateGroupScreen';
import LoginScreen from '@screens/sign-up/LoginScreen';
import SettingsScreen from '../../screens/profile/SettingsScreen';
import ProfileEditScreen from '../../screens/profile/ProfileEditScreen';
import ViewProfileScreen from '../../screens/profile/ViewProfileScreen';
import ExamHistoryScreen from '../../screens/profile/ExamHistoryScreen';
import WebViewScreen from '@screens/exam-hub/WebViewScreen';
import DiscussionScreen from '@screens/exam-hub/DiscussionScreen';
import EventDetailScreen from '@screens/exam-hub/EventDetailScreen';
import SetReminderScreen from '@screens/exam-hub/SetReminderScreen';
import SkillsStudioScreen from '@screens/skill-studio/SkillsStudioScreen';
import SkillCategoryScreen from '@screens/skill-studio/SkillCategoryScreen';
import  VideoDetailScreen from '@screens/skill-studio/VideoDetailScreen';
import CategoryListScreen from '@screens/skill-studio/CategoryListScreen';
import LeaderBoardScreen from '@screens/exam-hub/LeaderBoardScreen';
import ViewHistoryScreen from '@screens/exam-hub/ViewHistoryScreen';
import ReminderScreen from '../../screens/profile/ReminderScreen';
import ChangePasswordScreen from '../../screens/profile/ChangePasswordScreen';




// <-- Import your Create Account screen
import CreateAccountScreen from '@screens/sign-up/CreateAccountScreen';

export type AppStackParamList = {
  CreateAccount: undefined;
  Tabs: undefined;
  BrainGames: undefined;
  ExamHub: undefined;
  Jamb: undefined;
  PracticeScreen: undefined;
  PerformanceScreen: undefined;
  ViewPerformanceScreen: undefined;
  WaecScreen: undefined;
  WaecPracticeScreen: undefined;
  NecoScreen: undefined;
  NecoPracticeScreen: undefined;
  UtmeScreen: undefined;
  UtmePracticeScreen: undefined;
  Analysis: undefined;
  Novel: undefined;
  SummaryScreen: undefined;
  ChapterSummaryScreen: undefined;
  BookmarkedScreen: undefined;
  FlashCardScreen: undefined;
  NovelPastQuestionScreen: undefined;
  PastQuestionScreen: undefined;
  PastQuestionPracticeScreen: undefined;
  FlashStudyScreen: undefined;
  JambSyllabusScreen: undefined;
  JambSyllabusDetailScreen: undefined;
  JambBrochureScreen: undefined;
  JambBrochureDetailScreen: undefined;
  CoursesDetailScreen: undefined;
  SchoolQuestionScreen: undefined;
  AskQuestionScreen: undefined;
  AnswerQuestionScreen: undefined;
  GroupDetailScreen: undefined;
  AllGroupScreen: undefined;
  CreateGroupScreen: undefined;
  LoginScreen:undefined;
  RepliesScreen:undefined;
  SettingsScreen:undefined;
  ProfileEditScreen:undefined;
  ViewProfileScreen:undefined;
  ExamHistoryScreen:undefined;
  EventDetailScreen: undefined;
  WebViewScreen: { url: string };
  ChangePasswordScreen: undefined;
  SetReminderScreen:undefined;
  ReminderScreen:undefined;
  DiscussionScreen:undefined;
  LeaderBoardScreen:undefined;
  ViewHistoryScreen:undefined;
  SkillsStudioScreen:undefined;
  SkillCategoryScreen:undefined;
  CategoryListScreen:undefined;
  VideoDetailScreen:undefined;
  
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator 
      initialRouteName="CreateAccount" // <-- First screen
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="BrainGames" component={BrainGamesScreen} />
      <Stack.Screen name="ExamHub" component={ExamHubScreen} />
      <Stack.Screen name="Jamb" component={JambScreen} />
      <Stack.Screen name="PracticeScreen" component={PracticeScreen} />
      <Stack.Screen name="PerformanceScreen" component={PerformanceScreen} />
      <Stack.Screen name="ViewPerformanceScreen" component={ViewPerformanceScreen} />
      <Stack.Screen name="WaecScreen" component={WaecScreen} />
      <Stack.Screen name="WaecPracticeScreen" component={WaecPracticeScreen} />
      <Stack.Screen name="NecoScreen" component={NecoScreen} />
      <Stack.Screen name="NecoPracticeScreen" component={NecoPracticeScreen} />
      <Stack.Screen name="UtmeScreen" component={UtmeScreen} />
      <Stack.Screen name="UtmePracticeScreen" component={UtmePracticeScreen} />
      <Stack.Screen name="FlashCardScreen" component={FlashCardScreen} />
      <Stack.Screen name="FlashStudyScreen" component={FlashStudyScreen} />
      <Stack.Screen name="BookmarkedScreen" component={BookmarkedScreen} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} />
      <Stack.Screen name="Novel" component={NovelScreen} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      <Stack.Screen name="NovelPastQuestionScreen" component={NovelPastQuestionScreen} />
      <Stack.Screen name="PastQuestionScreen" component={PastQuestionScreen} />
      <Stack.Screen name="PastQuestionPracticeScreen" component={PastQuestionPracticeScreen} />
      <Stack.Screen name="ChapterSummaryScreen" component={ChapterSummaryScreen} />
      <Stack.Screen name="JambSyllabusScreen" component={JambSyllabusScreen} />
      <Stack.Screen name="JambSyllabusDetailScreen" component={JambSyllabusDetailScreen} />
      <Stack.Screen name="JambBrochureScreen" component={JambBrochureScreen} />
      <Stack.Screen name="JambBrochureDetailScreen" component={JambBrochureDetailScreen} />
      <Stack.Screen name="CoursesDetailScreen" component={CoursesDetailScreen} />
      <Stack.Screen name="SchoolQuestionScreen" component={SchoolQuestionScreen} />
      <Stack.Screen name="AskQuestionScreen" component={AskQuestionScreen} />
      <Stack.Screen name="AnswerQuestionScreen" component={AnswerQuestionScreen} />
      <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
      <Stack.Screen name="AllGroupScreen" component={AllGroupScreen} />
      <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="RepliesScreen" component={RepliesScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
        <Stack.Screen name="ViewProfileScreen" component={ViewProfileScreen} />
         <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
         <Stack.Screen name="ExamHistoryScreen" component={ExamHistoryScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
          <Stack.Screen name="SetReminderScreen" component={SetReminderScreen} />
          <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
          <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
          <Stack.Screen name="ViewHistoryScreen" component={ViewHistoryScreen} />
          <Stack.Screen name="LeaderBoardScreen" component={LeaderBoardScreen} />
          <Stack.Screen name="SkillsStudioScreen" component={SkillsStudioScreen} />
          <Stack.Screen name="SkillCategoryScreen" component={SkillCategoryScreen} />
          <Stack.Screen name="CategoryListScreen" component={ CategoryListScreen} />
          <Stack.Screen name="VideoDetailScreen" component={VideoDetailScreen} />
           
    </Stack.Navigator>
  );
}