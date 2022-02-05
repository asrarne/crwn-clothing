import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import { addItemToCart } from "../../redux/cart/cart-actions";

import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItemToCart }) => {
  //   console.log(item);
  const { imageUrl, name, price } = item;

  const handleAddItem = (e) => {
    addItemToCart(item);
  };

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted type="button" onClick={handleAddItem}>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (data) => dispatch(addItemToCart(data)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
