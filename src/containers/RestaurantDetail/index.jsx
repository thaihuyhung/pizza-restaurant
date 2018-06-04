import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { queryRestaurant } from './action';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { List as ImmutableList } from 'immutable';
import Rating from '../../components/Rating';
import Image from '../../components/Image';
import './style';
import RestaurantInfo from '../../components/RestaurantInfo';
import LoadingSkeleton from '../../components/SkeletonLoading'
import RestaurantDetailSkeleton from './skeleton/index';
import NotFoundMessage from '../../components/NotFoundMessage';

const currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
class RestaurantDetail extends Component {

  componentDidMount() {
    const { queryRestaurant, match } = this.props;
    const { params } = match;
    if (params && params['id']) {
      queryRestaurant({
        id: params['id']
      });
    }
  }

  /**
   * @function backToSearch
   * @description Method handle action when user click on back to result page
   */
  backToSearch = () => {
    const { history, locationBeforeTransition } = this.props;
    /**
     * We track the current location and its previous value in store.
     * Based on this, we could navigate to search screen with the same filter/sort/page data
     */
    if (locationBeforeTransition) {
      const search = locationBeforeTransition.get('search');
      const pathname = locationBeforeTransition.get('pathname');
      history.push({
        search,
        pathname
      });
    } else {
      history.push({
        pathname: "/restaurants"
      });
    }
  }

  /**
   * @function onAddToCart
   * @param  object item selected item
   * @description Handle action when user click add item 
   */
  onAddToCart = (item) => {
    // TODO Implement Add to card
    // eslint-disable-next-line
    console.log('onAddToCart', item);
  }

  renderSectionItem = (item) => {
    const price = currencyFormatter.format(item.get('price'));
    return (
      <li key={item.get('id')} className="restaurant__section-item">
        <div>
          <div>{item.get('name')}</div>
          <div className="restaurant__item-desc">{item.get('description')}</div>
        </div>
        <div className="restaurant__item-price-block">
          <div className="restaurant__item-price">{price}</div>
          <button className="restaurant__item-add" onClick={() => this.onAddToCart(item)}>
            <i className="material-icons">add</i>
          </button>
        </div>
      </li>
    )
  }

  renderSection = (section) => {
    return (
      <section key={section.get('id')} className="restaurant__section">
        <div className="restaurant__section-header">{section.get('name')}</div>
        <ul>
          {
            section.get('items', ImmutableList([])).map(this.renderSectionItem)
          }
        </ul>
      </section>
    )
  }

  renderErrorTemplate = () => {
    return (
      <div key="error" className="restaurant">
        <div className="restaurant__navigation">
          <div className="restaurant__navigation-button" onClick={this.backToSearch}>
              <i className="material-icons">arrow_back</i>
              Back to search result
          </div>
        </div>
        <div className="restaurant__error">
          <NotFoundMessage />
        </div>
      </div>
    )
  }

  renderContent = (restaurant) => {
    if (!restaurant) return null;
    const openingTime = restaurant.get('openingTimes', []).map(x => `${x.get('start')} - ${x.get('end')}`).join(' | ');
    const open = restaurant.get('status') === 'open';
    return (
      <div className="restaurant">
        <div className="restaurant__navigation">
          <div className="restaurant__navigation-button" onClick={this.backToSearch}>
              <i className="material-icons">arrow_back</i>
              Back to search result
          </div>
        </div>
        <div className="restaurant__header">
          <Image className="restaurant__logo" src={restaurant.getIn(['info', 'logoUri'])} />
          <div className="restaurant__main-info">
              <div className="restaurant__title">
                <h1 className="restaurant__name">{restaurant.getIn(['info', 'name'])}</h1>
                <Rating data={restaurant.get('rating')} />
              </div>
              <RestaurantInfo 
                address={restaurant.get('address')}
                categories={restaurant.getIn(['info', 'categories'], ImmutableList([])).toArray()}
                openingTime={openingTime}
                open={open}
                minimumForOrder={restaurant.get('minOrderValue')} />
            </div>
        </div>
        <div className="restaurant__sections">
          {
            restaurant.get('sections', ImmutableList([])).map(this.renderSection)
          }
        </div>
      </div>
    )
  }

  render() {
    const { restaurant, loading } = this.props;
    return (
      <LoadingSkeleton 
        loading={loading} 
        skeletonTemplate={<RestaurantDetailSkeleton />}
        hasError={!loading && !restaurant}
        errorTemplate={this.renderErrorTemplate()}
      >
      {this.renderContent(restaurant)}
      </LoadingSkeleton>
    );
  }
}

RestaurantDetail.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  queryRestaurant: PropTypes.func,
  restaurant: PropTypes.object,
  locationBeforeTransition: PropTypes.object,
  loading: PropTypes.bool,
}

const mapStateToProps = state => ({
  loading: state.getIn(['restaurant', 'loading']),
  restaurant: state.getIn(['restaurant', 'detail']),
  locationBeforeTransition: state.getIn(['router', 'locationBeforeTransition'])
})

const mapDispatchToProps = {
  queryRestaurant
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RestaurantDetail);