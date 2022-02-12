import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectShopCollection } from "../../redux/shop/shop-selectors";

// import "./collection.styles.scss";
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItems,
} from "./collection.styles";

const CollectionPage = ({ shopCollection }) => {
  const { title, items } = shopCollection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title.toUpperCase()}</CollectionTitle>
      <CollectionItems>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItems>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, props) => ({
  shopCollection: selectShopCollection(props.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
