export const CREATE_ANSWERS = 'CREATE_ANSWERS';

export const createAnswers = (answers) => {
  return {
    type: CREATE_ANSWERS,
    answersData: answers,
  };
};
