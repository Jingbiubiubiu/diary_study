import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import DiaryNavigator from './navigation/DiaryNavigator';
import questionReducer from './store/reducers/question';
import preStudyQuestionReducer from './store/reducers/preStudyQuestion';
import consentFormReducer from './store/reducers/consentForm';

const rootReducer = combineReducers({
  questions: questionReducer,
  preStudyQuesitons: preStudyQuestionReducer,
  consentForm: consentFormReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <DiaryNavigator />
    </Provider>
  );
}
