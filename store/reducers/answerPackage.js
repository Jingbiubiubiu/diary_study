import { CREATE_ANSWERPACKAGE } from '../actions/question';
import AnswerPackage from '../../models/answerPackage';
import createTimestamp from '../../finctions/createTimestamp';

const initialState = {
  // questions: DATA.QUESTION1,
  answerPackage: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANSWERPACKAGE:
      const newAnswerPackage = new AnswerPackage(
        action.answerData.studyId,
        action.answerData.preStudyAnswers,
        action.answerData.answers,
        createTimestamp()
      );
      console.log(newAnswerPackage);
      return {
        ...state,
        answerPackage: state.answerPackage.concat(newAnswerPackage),
      };
  }
  return state;
};
