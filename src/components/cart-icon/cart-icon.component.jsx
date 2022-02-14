import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart-actions";
import { selectCartItemsCount } from "../../redux/cart/cart-selectors";

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCountContainer,
} from "./cart-icon.styles";

const CartIcon = () => {
  const cartItemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();
  return (
    <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCountContainer>{cartItemCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

export default CartIcon;
