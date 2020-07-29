import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import questionReducer from './store/reducers/question';
import DiaryNavigator from './navigation/DiaryNavigator';

const rootReducer = combineReducers({
  questions: questionReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <DiaryNavigator />
    </Provider>
  );
}
