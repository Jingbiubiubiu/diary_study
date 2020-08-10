import * as DATA from '../../data/dummy-questions';
import { CREATE_CONSENTFORM } from '../actions/consentForm';
import ConsentForm from '../../models/consentForm';

const initialState = {
  // consentForm: DATA.CONSENTFORM1,
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
      // return newConsentForm;

      // console.log('hi');

      console.log(newConsentForm);
      // console.log(state.consentForm);
      return {
        ...state,
        consentForm: newConsentForm,
      };
  }
  return state;
};
