import memoize from "lodash.memoize";
import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopCollectionsPreview = createSelector(
  [selectShop],
  (shop) => shop.collections ? Object.values(shop.collections) : [] 
);

export const selectShopCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections ? collections[collectionUrlParam] : null
  )
);
