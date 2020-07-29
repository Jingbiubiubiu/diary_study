export const CREATE_QUESTION = 'CREATE_QUESTION';

export const createQuestion = (
  // questionId,
  content,
  answerType1,
  answerType2
) => {
  return {
    type: CREATE_QUESTION,
    questionData: {
      content,
      answerType1,
      answerType2,
    },
  };
};
