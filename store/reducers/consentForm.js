import * as DATA from '../../data/dummy-questions';
import { CREATE_CONSENTFORM } from '../actions/consentForm';
import ConsentForm from '../../models/consentForm';

const initialState = {
  consentForm: DATA.CONSENTFORM1,
  // consentForm: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONSENTFORM:
      const newConsentForm = new ConsentForm(
        action.formData.description,
        action.formData.preQuetions,
        action.formData.agreement
      );
      console.log('hi');

      // console.log(newConsentForm);
      // console.log(state.consentForm);
      return {
        ...state,
        consentForm: state.consentForm.concat(newConsentForm),
      };
  }
  return state;
};
