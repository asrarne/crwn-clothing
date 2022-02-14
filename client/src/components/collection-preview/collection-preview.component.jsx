import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import {
  CollectionPreviewContainer,
  CollectionPreviewTitle,
  CollectionPreviewItems,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, routeName, items, history, match }) => (
  <CollectionPreviewContainer>
    <CollectionPreviewTitle
      onClick={() => history.push(`${match.url}/${routeName}`)}
    >
      {title.toUpperCase()}
    </CollectionPreviewTitle>
    <CollectionPreviewItems>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </CollectionPreviewItems>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
