import { CREATE_QUESTION, CLEAR_QUESTION } from '../actions/question';
import Question from '../../models/question';

const initialState = {
  questions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION:
      let questionNumber = state.questions.length + 1;
      const newQuestion = new Question(
        questionNumber,
        action.questionData.content,
        action.questionData.answerType,
        action.questionData.option1,
        action.questionData.option2,
        action.questionData.option3,
        action.questionData.option4
      );
      return {
        ...state,
        questions: state.questions.concat(newQuestion),
      };
    case CLEAR_QUESTION:
      return {
        ...state,
        questions: [],
      };
  }
  return state;
};
