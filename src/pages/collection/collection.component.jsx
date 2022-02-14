import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectShopCollection } from "../../redux/shop/shop-selectors";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItems,
} from "./collection.styles";

const CollectionPage = () => {
  const  { collectionId } = useParams();
  const shopCollection = useSelector(selectShopCollection(collectionId));
  const { title, items } = shopCollection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title.toUpperCase()}</CollectionTitle>
      <CollectionItems>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItems>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
