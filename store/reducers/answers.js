import { CREATE_ANSWERS } from '../actions/answers';

const initialState = {
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANSWERS:
      console.log('hello');

      const newAnswers = action.answersData;
      // console.log(action);
      console.log(newAnswers);
      // console.log(state.questions);
      return {
        ...state,
        answers: state.answers.concat(newAnswers),
      };
  }
  return state;
};
