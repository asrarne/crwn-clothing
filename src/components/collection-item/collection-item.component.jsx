import React from "react";
import { useDispatch } from "react-redux";

import { addItemToCart } from "../../redux/cart/cart-actions";

import "./collection-item.styles.scss";
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
  const { imageUrl, name, price } = item;
  const dispatch = useDispatch();
  const handleAddItem = (e) => {
    dispatch(addItemToCart(item));
  };

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton inverted type="button" onClick={handleAddItem}>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
