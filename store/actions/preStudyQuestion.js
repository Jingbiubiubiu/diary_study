export const CREATE_PREQUESTION = 'CREATE_PREQUESTION';
export const CLEAR_PREQUESTION = 'CLEAR_PREQUESTION';

export const createPreStudyQuestion = (
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

export const clearPreStudyQuestion = () => {
  return {
    type: CLEAR_PREQUESTION,
  };
};
