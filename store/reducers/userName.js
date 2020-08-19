import { UPDATA_USERNAME } from '../actions/userName';

const initialState = {
  userName: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATA_USERNAME:
      // let unArray = action.Email.split('@');
      // let userName = unArray[0];
      return {
        ...state,
        userName: action.Email,
        // userName: userName,
      };
  }

  return state;
};
