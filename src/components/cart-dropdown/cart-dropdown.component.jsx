import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart-selectors";
import { toggleCartHidden } from "../../redux/cart/cart-actions";

// import "./cart-dropdown.styles.scss";
import {
  CartDropdownContainer,
  CartItemContainer,
  EmptyMessage,
  CartButton,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, toggleCartHidden }) => {
  const history = useHistory();

  const handleClick = () => {
    toggleCartHidden();
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

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
