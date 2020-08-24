export const CREATE_QUESTION = 'CREATE_QUESTION';

export const createQuestion = (
  // questionId,
  content,
  answerType,
  option1,
  option2,
  option3,
  option4
) => {
  return {
    type: CREATE_QUESTION,
    questionData: {
      content,
      answerType,
      option1,
      option2,
      option3,
      option4
    },
  };
};
