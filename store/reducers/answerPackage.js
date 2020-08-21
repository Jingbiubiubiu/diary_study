import { CREATE_ANSWERPACKAGE } from '../actions/answerPackage';
import AnswerPackage from '../../models/answerPackage';
import createTimestamp from '../../functions/createTimestamp';
import URL from '../../constants/URL';

const initialState = {
  // questions: DATA.QUESTION1,
  answerPackage: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANSWERPACKAGE:
      const newAnswerPackage = new AnswerPackage(
        action.answerData.studyNumber,
        action.answerData.preStudyAnswers,
        action.answerData.answers,
        action.answerData.userName,
      );
      
      return {
        ...state,
        answerPackage: state.answerPackage.concat(newAnswerPackage),
      };
  }
  return state;
};
