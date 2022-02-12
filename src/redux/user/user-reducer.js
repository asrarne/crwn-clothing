import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:  
      return {
        ...state,
        errorMessage: undefined,
        currentUser: action.payload,
      };
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.USER_SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
