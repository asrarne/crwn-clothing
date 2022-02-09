import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectShopCollectionsPreview } from "../../redux/shop/shop-selectors";

import { CollectionOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = ({ collections }) => (
  <CollectionOverviewContainer>
    {collections.map(({ id, ...collection }) => (
      <CollectionPreview key={id} {...collection} />
    ))}
  </CollectionOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollectionsPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
