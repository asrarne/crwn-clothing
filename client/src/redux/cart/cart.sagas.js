import { takeLatest, put, call, all } from "redux-saga/effects";

import { userActionTypes } from "../user/user.types";
import { clearCart } from "./cart-actions";

export function* clearCartOnUserSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnUserSignOut);
}

export default function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
