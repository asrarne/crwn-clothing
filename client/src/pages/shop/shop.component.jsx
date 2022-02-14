import React, { useLayoutEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { fetch_collections_start } from "../../redux/shop/shop-actions";

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetch_collections_start());
  }, [dispatch]);

  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

export default ShopPage;
