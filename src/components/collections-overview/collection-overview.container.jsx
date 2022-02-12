import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsFetching } from '../../redux/shop/shop-selectors';
import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector ({
    isLoading: selectIsFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
    )
    (CollectionsOverview);

export default CollectionOverviewContainer;