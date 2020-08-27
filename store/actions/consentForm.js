export const CREATE_CONSENTFORM = 'CREATE_CONSENTFORM';
export const CLEAR_CONSENTFORM = 'CLEAR_CONSENTFORM';

export const createConsentForm = (
  // questionId,
  description,
  preQuestions,
  agreement
) => {
  return {
    type: CREATE_CONSENTFORM,
    formData: {
      description,
      preQuestions,
      agreement,
    },
  };
};

export const clearConsentForm = () => {
  return {
    type: CLEAR_CONSENTFORM,
  };
};
