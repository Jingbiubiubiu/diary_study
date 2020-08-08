import * as DATA from '../../data/dummy-questions';
import { CREATE_STUDY } from '../actions/study';
import Study from '../../models/study';

const initailState = {
  studies: DATA.STUDY1,
};

export default (state = initailState, action) => {
  switch (action.type) {
    case CREATE_STUDY:
      const newStudy = new Study(
        new Date().toString(),
        action.studyDdata.studyName,
        action.studyDdata.studyNumber,
        action.studyDdata.studyPassword,
        action.studyDdata.consentForm,
        action.studyDdata.questions,
        action.studyDdata.establishTime,
        true,
        null
      );
      console.log(newStudy);
      console.log(state.studies);
      return {
        ...state,
        studies: state.studies.concat(newQuestion),
      };
  }
  return state;
};
