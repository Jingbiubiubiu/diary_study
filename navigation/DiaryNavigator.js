import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import Colors from '../constants/Colors';
import RoleScreen from '../screens/RoleScreen';
import JoininScreen from '../screens/participants/JoininScreen';
import ParStudyListScreen from '../screens/participants/ParStudyListScreen';
import SampleFormScreen from '../screens/participants/SampleFormScreen';
import StudyFormScreen from '../screens/participants/StudyFormScreen';
import AddStudyQuestionScreen from '../screens/researchers/AddStudyQuestionScreen';
import ResStudyListScreen from '../screens/researchers/ResStudyListScreen';
import SetNewStudyScreen from '../screens/researchers/SetNewStudyScreen';
import SignInScreen from '../screens/authenticate/SignInScreen';
import SignUpScreen from '../screens/authenticate/SignUpScreen';

const defaultNavOptions = {
  headerTintColor: Colors.primary,
};

const AuthNavigator = createStackNavigator(
  {
    Signin: SignInScreen,
    Signup: SignUpScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const RoleNavigator = createStackNavigator(
  {
    Role: RoleScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const ParticipantsNavigator = createStackNavigator(
  {
    ParStudyList: ParStudyListScreen,
    Joinin: JoininScreen,
    SampleForm: SampleFormScreen,
    StudyForm: StudyFormScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const ResearchersNavigator = createStackNavigator(
  {
    ResStudyList: ResStudyListScreen,
    SetNewStudy: SetNewStudyScreen,
    AddStudyQuestion: AddStudyQuestionScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const MainNavigator = createSwitchNavigator({
  // Auth: AuthNavigator,
  Role: RoleNavigator,
  Par: ParticipantsNavigator,
  Res: ResearchersNavigator,
});

export default createAppContainer(MainNavigator);
