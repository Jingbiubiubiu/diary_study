import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import DiaryNavigator from './navigation/DiaryNavigator';
import questionReducer from './store/reducers/question';
import preStudyQuestionReducer from './store/reducers/preStudyQuestion';
import consentFormReducer from './store/reducers/consentForm';
import studyRecuder from './store/reducers/study';
import preStudyAnswersReducer from './store/reducers/preStudyAnswers';
import answersReducer from './store/reducers/answers';
import answerPackageReducer from './store/reducers/answerPackage';
import userNameReducer from './store/reducers/userName';

const rootReducer = combineReducers({
  questions: questionReducer,
  preStudyQuesitons: preStudyQuestionReducer,
  consentForm: consentFormReducer,
  studies: studyRecuder,
  preStudyAnswers: preStudyAnswersReducer,
  answers: answersReducer,
  answerPackage: answerPackageReducer,
  userName: userNameReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <DiaryNavigator />
    </Provider>
  );
}
