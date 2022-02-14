import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart-selectors";
import { toggleCartHidden } from "../../redux/cart/cart-actions";

import {
  CartDropdownContainer,
  CartItemContainer,
  EmptyMessage,
  CartButton,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const history = useHistory();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCartHidden());
    history.push("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItemContainer>
        {cartItems.length === 0 ? (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        ) : (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        )}
      </CartItemContainer>
      <CartButton type="button" onClick={handleClick}>
        GO TO CHECKOUT
      </CartButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
