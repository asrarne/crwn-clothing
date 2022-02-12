import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { fetch_collections_start } from "../../redux/shop/shop-actions";

const ShopPage = ({ fetch_collections_start, match }) => {
  useEffect(() => {
    fetch_collections_start();
  }, [fetch_collections_start]);

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

const mapDispatchToProps = (dispatch) => ({
  fetch_collections_start: () => dispatch(fetch_collections_start()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
