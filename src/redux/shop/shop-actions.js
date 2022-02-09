import { shopActionTypes } from "./shop.types";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";

export const updateCollections = (collections) => ({
  type: shopActionTypes.UPDATE_COLLECTIONS,
  payload: collections,
});

export const getCollections = () => {
  return (dispatch) => {
    const q = query(collection(db, "collections"));
    const shop_data = [];
    return getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { title, items } = doc.data();
        const id = doc.id;
        shop_data[title.toLowerCase()] = {
          id,
          title,
          routeName: encodeURI(title.toLowerCase()),
          items,
        };
      });
      dispatch(updateCollections(shop_data));
    });
  };
};
