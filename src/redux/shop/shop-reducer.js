// import SHOP_DATA from "./shop.data";
import { shopActionTypes } from "./shop.types";

const INITIAL_STATE = {
  isFetching: false,
  collections: [],
  errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: undefined
      };
    case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        collections: action.payload
      };
    case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default shopReducer;
