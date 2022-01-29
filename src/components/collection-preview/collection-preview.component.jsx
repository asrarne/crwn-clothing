import React from "react";
import { withRouter } from 'react-router-dom';
import CollectionItem from "../collection-item/collection-item.component";
import './collection-preview.styles.scss';

const CollectionPreview = ({ title, routeName, items, history, match}) => (
    <div className="collection-preview">
        <h2 className="title"
            onClick={()=> history.push(`${match.url}/${routeName}`)}   
            >{title.toUpperCase()}</h2>
    <div className="preview">
        { items
            .filter((item, idx) => idx < 4)
            .map(({id, ...item}) => <CollectionItem key={id} {...item} />) }
    </div>
</div>
);
    
export default withRouter(CollectionPreview);