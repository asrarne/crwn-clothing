import React from "react";
import { connect } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  removeItemFromCheckout,
} from "../../redux/cart/cart-actions";

// import "./checkout-item.styles.scss";
import {
  CheckoutItemContainer,
  ImageContainer,
  ItemName,
  ItemPrice,
  ItemQuantityContainer,
  ItemQuantityValue,
  ItemArrow,
  RemoveButtonContainer,
} from "./checkout-item.styles";

const CheckoutItem = ({
  cartItem,
  addItemToCart,
  removeItemFromCart,
  removeItemFromCheckout,
}) => {
  const { imageUrl, name, quantity, price } = cartItem;

  const handleRemove = () => {
    removeItemFromCheckout(cartItem);
  };

  const handleDecreaseQuantity = () => {
    removeItemFromCart(cartItem);
  };

  const handleIncreaseQuantity = () => {
    addItemToCart(cartItem);
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" />
      </ImageContainer>
      <ItemName>{name}</ItemName>
      <ItemQuantityContainer>
        <ItemArrow onClick={handleDecreaseQuantity}>&#10094;</ItemArrow>
        <ItemQuantityValue>{quantity}</ItemQuantityValue>
        <ItemArrow onClick={handleIncreaseQuantity}>&#10095;</ItemArrow>
      </ItemQuantityContainer>
      <ItemPrice>${price}</ItemPrice>
      <RemoveButtonContainer onClick={handleRemove}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  removeItemFromCheckout: (item) => dispatch(removeItemFromCheckout(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
