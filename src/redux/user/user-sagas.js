import { takeLatest, put, take, cancelled, call, all } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { userActionTypes } from "./user.types";
import {
  SignInSuccess,
  SignInFailure,
  signOutSuccess,
  signOutFailure,
  userSignUpSuccess,
  userSignUpFailure
} from "./user-actions";

export function* getSnapshotFromUser(user, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user, additionalData);
    const userSnapshot = yield getDoc(userRef);
    yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    const errorMessage = error.message;
    yield put(SignInFailure(errorMessage));
  }
}
export function* googleSignInAsync() {
  try {
    const googleAuthProvider = yield new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: "select_account" });
    const { user } = yield signInWithPopup(auth, googleAuthProvider);
    yield getSnapshotFromUser(user);
  } catch (error) {
    const errorMessage = error.message;
    yield put(SignInFailure(errorMessage));
  }
}

export function* googleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignInAsync);
}

export function* emailSignInAsync({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUser(user);
  } catch (error) {
    const errorMessage = error.message;
    yield put(SignInFailure(errorMessage));
  }
}

export function* emailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* userSignUpAsync(action) {
  const { email, password, displayName } = action.payload;
  try {
    const {user} = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(userSignUpSuccess({user, additionalData:{displayName} }));
  } catch (error) {
    const errorMessage = error.message;
    yield put(userSignUpFailure(errorMessage));
  }
}

export function* userSignUpStart() {
  yield takeLatest(userActionTypes.USER_SIGN_UP_START, userSignUpAsync);
}

// first create your eventChannel
const authEventsChannel = eventChannel((emit) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    emit({ user });
  });
  // return a function that can be used to unregister listeners when the saga is cancelled
  return unsubscribe;
});

export function* getUserOnAuthStateChangeAsync() {
  try {
    while (true) {
      const { user } = yield take(authEventsChannel);
      // handle auth state
      if (user) {
        yield getSnapshotFromUser(user);
      } else {
        yield put(SignInSuccess(user));
      }
    }
  } catch (error) {
    const errorMessage = error.message;
    yield put(SignInFailure(errorMessage));
  } finally {
    // unregister listener if the saga was cancelled
    if (yield cancelled()) authEventsChannel.close();
  }
}

export function* getUserOnAuthStateChange() {
  yield takeLatest(
    userActionTypes.GET_USER_ON_AUTH_STATE_CHANGE_START,
    getUserOnAuthStateChangeAsync
  );
}

export function* signOutStartAsync() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    const errorMessage = error.message;
    yield put(signOutFailure(errorMessage));
  }
}

export function* signOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOutStartAsync);
}

export function* signInAfterSignUp({payload:{user, additionalData}}) {
  yield getSnapshotFromUser(user, additionalData);
}

export function* signInOnSignUpStart() {
  yield takeLatest(userActionTypes.USER_SIGN_UP_SUCCESS, signInAfterSignUp);
}


export default function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(emailSignInStart),
    call(getUserOnAuthStateChange),
    call(userSignUpStart),
    call(signOutStart),
    call(signInOnSignUpStart)
  ]);
}