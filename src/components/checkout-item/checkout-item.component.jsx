import React from "react";
import { connect } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemFromCheckout,
} from "../../redux/cart/cart-actions";

import "./checkout-item.styles.scss";

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
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={handleDecreaseQuantity}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncreaseQuantity}>
          &#10095;
        </div>
      </div>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={handleRemove}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  removeItemFromCheckout: (item) => dispatch(removeItemFromCheckout(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
