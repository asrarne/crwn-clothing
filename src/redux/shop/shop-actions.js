import { shopActionTypes } from "./shop.types";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase/firebase.utils";



export const fetch_collections_start = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetch_collections_success = (collections) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections
});

export const fetch_collections_failure = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// export const fetchCollectionsStartAsync = () => {
//   return (dispatch) => {
//     dispatch(fetch_collections_start());
//     const q = query(collection(db, "collections"));
//     const shop_data = [];
//     return getDocs(q).then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         const { title, items } = doc.data();
//         const id = doc.id;
//         shop_data[title.toLowerCase()] = {
//           id,
//           title,
//           routeName: encodeURI(title.toLowerCase()),
//           items,
//         };
//       });
//     }).then(()=> dispatch(fetch_collections_success(shop_data))
//     ).catch((error) => {
//       // const errorCode = error.errorCode;
//       const errorMessage = error.errorMessage;
//       dispatch(fetch_collections_failure(errorMessage));
//     });
//   };
// };
