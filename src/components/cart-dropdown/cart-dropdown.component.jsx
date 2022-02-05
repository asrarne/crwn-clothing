import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart-selectors";
import { toggleCartHidden } from "../../redux/cart/cart-actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, toggleCartHidden }) => {
  const history = useHistory();

  const handleClick = () => {
    toggleCartHidden();
    history.push("/checkout");
  };
  
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <span className="empty-message">Your cart is empty</span>
        ) : (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        )}
      </div>
      <CustomButton type="button" onClick={handleClick}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
