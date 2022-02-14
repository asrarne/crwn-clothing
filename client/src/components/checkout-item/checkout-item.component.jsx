import React from "react";
import { useDispatch } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  removeItemFromCheckout,
} from "../../redux/cart/cart-actions";

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

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItemFromCheckout(cartItem));
  };

  const handleDecreaseQuantity = () => {
    dispatch(removeItemFromCart(cartItem));
  };

  const handleIncreaseQuantity = () => {
    dispatch(addItemToCart(cartItem));
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

export default CheckoutItem;
