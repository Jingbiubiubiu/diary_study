export const CREATE_CONSENTFORM = 'CREATE_CONSENTFORM';

export const createConsentForm = (
  // questionId,
  description,
  preQuetions,
  agreement
) => {
  return {
    type: CREATE_CONSENTFORM,
    formData: {
      description,
      preQuetions,
      agreement,
    },
  };
};
