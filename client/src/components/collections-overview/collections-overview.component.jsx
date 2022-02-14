import React from "react";
import { useSelector } from "react-redux";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectShopCollectionsPreview } from "../../redux/shop/shop-selectors";

import { CollectionOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = () => {
  const collections = useSelector(selectShopCollectionsPreview);
  return (
    <CollectionOverviewContainer>
      {collections.map(({ id, ...collection }) => (
        <CollectionPreview key={id} {...collection} />
      ))}
    </CollectionOverviewContainer>
  );
};

export default CollectionsOverview;
