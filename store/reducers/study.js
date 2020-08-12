import * as DATA from '../../data/dummy-questions';
import { CREATE_STUDY, END_STUDY } from '../actions/study';
import Study from '../../models/study';
import createTimestamp from '../../finctions/createTimestamp';

const initialState = {
  studies: DATA.STUDY1,
};

const chars = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const createRandom = () => {
  var randomString = '';
  for (let i = 0; i < 6; i++) {
    var id = Math.ceil(Math.random() * 61);
    randomString += chars[id];
  }
  return randomString;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STUDY:
      const newStudy = new Study(
        new Date().toString(),
        action.studyData.studyName,
        // action.studyDdata.studyNumber,
        // action.studyDdata.studyPassword,
        createRandom(),
        createRandom(),
        action.studyData.consentForm,
        action.studyData.questions,
        // action.studyDdata.establishTime,
        createTimestamp(),
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
        createTimestamp()
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
