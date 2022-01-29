import React from "react";
import SHOP_DATA from './shop.data';
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import './shop.styles.scss';

class ShopPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render () {
        const {collections} = this.state;
        return (    
            <div>
                {collections.map(({id, ...collection}) => <CollectionPreview key={id} {...collection}/> )}
            </div>
        );
    }
}

export default ShopPage;