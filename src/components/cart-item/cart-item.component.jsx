import React from "react";

// import "./cart-item.styles.scss";
import {
  CartItemConatiner,
  ItemDetailsContainer,
  CartItemImage,
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
  // console.log('imageUrl: ', imageUrl);
  return (
    <CartItemConatiner>
      <CartItemImage src={imageUrl} alt="item" />
      <ItemDetailsContainer>
        <span>{name}</span>
        <span>
          {quantity} X ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemConatiner>
  );
};

export default CartItem;
