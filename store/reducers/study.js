import * as DATA from '../../data/dummy-questions';
import { CREATE_STUDY, END_STUDY } from '../actions/study';
import Study from '../../models/study';
import createTimestamp from '../../finctions/createTimestamp';
import createRandom from '../../finctions/createRandom';

const initialState = {
  studies: DATA.STUDY1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STUDY:
      // console.log('hello');
      const newStudy = new Study(
        new Date().toString(),
        action.studyData.studyName,
        action.studyData.studyNumber,
        action.studyData.studyPassword,
        // createRandom(),
        // createRandom(),
        action.studyData.consentForm,
        action.studyData.questions,
        action.studyData.establishTime,
        // createTimestamp(),
        true,
        null
      );
      console.log(newStudy);
      // console.log(state.studies);
      return {
        ...state,
        studies: state.studies.concat(newStudy),
      };
    case END_STUDY:
      // console.log(action.sId);
      const studyIndex = state.studies.findIndex(
        (study) => study.studyId === action.sId
      );
      // console.log(studyIndex);

      const updatedStudy = new Study(
        action.sId,
        state.studies[studyIndex].studyName,
        state.studies[studyIndex].studyNumber,
        state.studies[studyIndex].studyPassword,
        state.studies[studyIndex].consentForm,
        state.studies[studyIndex].questions,
        state.studies[studyIndex].establishTime,
        false,
        action.eTime

        // createTimestamp()
      );
      const updatedStudies = [...state.studies];
      updatedStudies[studyIndex] = updatedStudy;

      return {
        ...state,
        studies: updatedStudies,
      };
  }

  return state;
};
