import { CREATE_CONSENTFORM, CLEAR_CONSENTFORM } from '../actions/consentForm';
import ConsentForm from '../../models/consentForm';

const initialState = {
  consentForm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONSENTFORM:
      const newConsentForm = new ConsentForm(
        action.formData.description,
        action.formData.preQuestions,
        action.formData.agreement
      );
      return {
        ...state,
        consentForm: newConsentForm,
      };
    case CLEAR_CONSENTFORM:
      return {
        ...state,
        consentForm: null,
      };
  }
  return state;
};
