import { takeLatest, put, all, call } from "redux-saga/effects";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";

import {
  fetch_collections_success,
  fetch_collections_failure,
} from "./shop-actions";
import { shopActionTypes } from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const q = query(collection(db, "collections"));
    const shop_data = [];
    const querySnapshot = yield getDocs(q);
    yield querySnapshot.forEach((doc) => {
      const { title, items } = doc.data();
      const id = doc.id;
      shop_data[title.toLowerCase()] = {
        id,
        title,
        routeName: encodeURI(title.toLowerCase()),
        items,
      };
    });
    yield put(fetch_collections_success(shop_data));
  } catch (error) {
    // const errorCode = error.errorCode;
    const errorMessage = error.errorMessage;
    yield put(fetch_collections_failure(errorMessage));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export default function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
