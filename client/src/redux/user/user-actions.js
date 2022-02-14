import { userActionTypes } from "./user.types";

export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const SignInSuccess = (user) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const SignInFailure = (errorMessage) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage
});

export const emailSignInStart = (user) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: user
});

export const userSignUpStart = (user) => ({
  type: userActionTypes.USER_SIGN_UP_START,
  payload: user
});

export const userSignUpSuccess = (user) => ({
  type: userActionTypes.USER_SIGN_UP_SUCCESS,
  payload: user
});

export const userSignUpFailure = (errorMessage) => ({
  type: userActionTypes.USER_SIGN_UP_FAILURE,
  payload: errorMessage
});


export const getUserOnAuthStateChangeStart = () => ({
  type: userActionTypes.GET_USER_ON_AUTH_STATE_CHANGE_START,
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (errorMessage) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: errorMessage
});