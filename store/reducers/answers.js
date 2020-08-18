import { CREATE_ANSWERS } from '../actions/answers';

const initialState = {
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANSWERS:
      const newAnswers = action.answersData;
      return {
        ...state,
        answers: state.answers.concat(newAnswers),
      };
  }
  return state;
};
