import { CREATE_ANSWERS } from '../actions/answers';

const initialState = {
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANSWERS:
      console.log('creating answer');
      const newAnswers = action.answersData;
      console.log(newAnswers);
      return {
        ...state,
        answers: state.answers.concat(newAnswers),
      };
  }
  return state;
};
