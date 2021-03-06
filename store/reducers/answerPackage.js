import { CREATE_ANSWERPACKAGE } from '../actions/answerPackage';
import AnswerPackage from '../../models/answerPackage';

const initialState = {
  answerPackage: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANSWERPACKAGE:
      const newAnswerPackage = new AnswerPackage(
        action.answerData.studyNumber,
        action.answerData.preStudyAnswers,
        action.answerData.answers,
        action.answerData.userName
      );

      return {
        ...state,
        answerPackage: state.answerPackage.concat(newAnswerPackage),
      };
  }
  return state;
};
