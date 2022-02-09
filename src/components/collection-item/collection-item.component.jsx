import React from "react";
import { connect } from "react-redux";

import { addItemToCart } from "../../redux/cart/cart-actions";

import "./collection-item.styles.scss";
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer
} from "./collection-item.styles";

const CollectionItem = ({ item, addItemToCart }) => {
  //   console.log(item);
  const { imageUrl, name, price } = item;

  const handleAddItem = (e) => {
    addItemToCart(item);
  };

  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={imageUrl}/>
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

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (data) => dispatch(addItemToCart(data)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
