import QUESTION1 from '../../data/dummy-questions';
import { CREATE_QUESTION } from '../actions/question';
import Question from '../../models/question';

const initialState = {
  questions: QUESTION1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION:
      const newQuestion = new Question(
        new Date().toString(),
        action.questionData.content,
        action.questionData.answerType1,
        action.questionData.answerType2
      );
      return {
        ...state,
        questions: state.questions.concat(newQuestion),
      };
  }
  return state;
};
