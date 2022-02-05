import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectShopCollection } from "../../redux/shop/shop-selectors";

import "./collection.styles.scss";

const CollectionPage = ({ shopCollection }) => {
  const { title, items } = shopCollection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  shopCollection: selectShopCollection(props.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
