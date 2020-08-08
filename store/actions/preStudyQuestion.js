export const CREATE_PREQUESTION = 'CREATE_PREQUESTION';

export const createPreStudyQuestion = (
  // questionId,
  content,
  answerType,
  option1,
  option2,
  option3,
  option4
) => {
  return {
    type: CREATE_PREQUESTION,
    questionData: {
      content,
      answerType,
      option1,
      option2,
      option3,
      option4,
    },
  };
};
