import {
  INITIALIZE_RESEARCHER_STUDIES,
  INITIALIZE_PARTICIPANT_STUDIES,
  CREATE_STUDY,
  END_STUDY,
} from '../actions/study';
import Study from '../../models/study';
import URL from '../../constants/URL';

const initialState = {
  researcher_studies: [],
  participant_studies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_RESEARCHER_STUDIES:
      return {
        ...state,
        researcher_studies: action.study_list,
      };
    case INITIALIZE_PARTICIPANT_STUDIES:
      return {
        ...state,
        participant_studies: action.study_list,
      };
    case CREATE_STUDY:
      const newStudy = new Study(
        action.studyData.userName,
        action.studyData.studyName,
        action.studyData.studyNumber,
        action.studyData.studyPassword,
        action.studyData.consentForm,
        action.studyData.questions,
        action.studyData.establishTime,
        true,
        null
      );
      console.log(newStudy);

      let url =
        URL.address + 'study/createstudy/?email=' + action.studyData.userName;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudy),
      })
        .then((response) => response.json())
        .then((json) => {});
      return {
        ...state,
      };
    case END_STUDY:
      const studyIndex = state.researcher_studies.findIndex(
        (study) => study.studyId === action.sId
      );

      const updatedStudy = new Study(
        action.sId,
        state.researcher_studies[studyIndex].studyName,
        state.researcher_studies[studyIndex].studyNumber,
        state.researcher_studies[studyIndex].studyPassword,
        state.researcher_studies[studyIndex].consentForm,
        state.researcher_studies[studyIndex].questions,
        state.researcher_studies[studyIndex].establishTime,
        false,
        action.eTime
      );
      const updatedStudies = [...state.researcher_studies];
      updatedStudies[studyIndex] = updatedStudy;

      return {
        ...state,
        researcher_studies: updatedStudies,
      };
  }

  return state;
};
