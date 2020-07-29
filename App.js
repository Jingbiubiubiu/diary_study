import React from 'react';
import { StyleSheet } from 'react-native';

import DiaryNavigator from './navigation/DiaryNavigator';

export default function App() {
  return <DiaryNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
