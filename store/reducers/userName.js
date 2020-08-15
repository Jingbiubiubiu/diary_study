import { UPDATA_USERNAME } from '../actions/userName';

const initialState = {
  userName: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATA_USERNAME:
      return {
        ...state,
        userName: action.Email,
      };
  }

  return state;
};
