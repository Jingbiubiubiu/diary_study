import * as DATA from '../../data/dummy-questions';
import { CREATE_STUDY } from '../actions/study';
import Study from '../../models/study';
import moment from 'moment';

const initailState = {
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

const createTimestamp = () => {
  var date = new Date();
  var Y = date.getFullYear() + ' ';
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/';
  var h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var datastamp = D + M + Y + h + m + s;
  return datastamp;
};

export default (state = initailState, action) => {
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
  }
  return state;
};
