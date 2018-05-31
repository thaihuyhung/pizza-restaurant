import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { queryRestaurant } from './action';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { List as ImmutableList } from 'immutable';
import classNames from 'classnames';
import Rating from 'src/components/Rating';
import Category from 'src/components/Category';
import './style';

const currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
class RestaurantDetail extends Component {

  componentDidMount() {
    const { history, queryRestaurant } = this.props;
    const path = history.location.pathname.split('/');
    if (path[1] && path[1] === 'restaurant' && path[2]) {
      queryRestaurant({
        id: path[2]
      });
    }
  }

  onAddToCart = (item) => {
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

  render() {
    const { restaurant } = this.props;
    // TODO handle skeleton loading
    if (!restaurant) return null;
    const streetNumber = restaurant.getIn(['address', 'streetNumber']);
    const streetName = restaurant.getIn(['address', 'streetName']);
    const zipcode = restaurant.getIn(['address', 'zipcode']);
    const city = restaurant.getIn(['address', 'city']);
    const address = `${streetName} ${streetNumber}, ${zipcode} ${city}`;
    const openingTime = restaurant.get('openingTimes').map(x => `${x.get('start')} - ${x.get('end')}`).join(' | ');
    const isOpen = restaurant.get('status') === 'open';
    const minimumForOrder = currencyFormatter.format(restaurant.get('minOrderValue'));
    return (
      <div className="restaurant">
        <div className="restaurant__header">
          <img className="restaurant__logo" src={restaurant.getIn(['info', 'logoUri'])} />
          <div className="restaurant__info">
            <div className="restaurant__main-info">
              <div className="restaurant__title">
                <h1 className="restaurant__name">{restaurant.getIn(['info', 'name'])}</h1>
                <Rating data={restaurant.get('rating')} />
              </div>
              <div className="restaurant__info-line">
                <i className="material-icons">location_on</i>
                <a
                  className="link"
                  href={`https://www.google.com/maps/place/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{address}</a>
              </div>
              <div className="restaurant__info-line">
                <i className="material-icons">room_service</i>
                <span>Pizza-Pasta, Schnitzel-Steaks, Vegetarisch</span>
              </div>
              <div className="restaurant__info-line">
                <i className="material-icons">access_time</i>
                <span 
                  className={classNames('restaurant__opening-status', 
                    { 'restaurant__opening-status--closed': !isOpen})}>
                    {isOpen ? 'Open' : 'Closed'}
                </span>
                <span>{openingTime}</span>
              </div>
              <div className="restaurant__info-line">
                <i className="material-icons">shopping_cart</i>
                <span>Minimum {minimumForOrder} for orders</span>
              </div>
            </div>
            <div className="restaurant__info-line">
              <i className="material-icons">local_offer</i>
              {
                restaurant
                  .getIn(['info', 'categories'], ImmutableList([]))
                  .map(category => <Category key={category} data={category} />)
              }
            </div>
          </div>
        </div>
        <div className="restaurant__sections">
          {
            restaurant.get('sections', ImmutableList([])).map(this.renderSection)
          }
        </div>
      </div>
    );
  }
}

RestaurantDetail.propTypes = {
  history: PropTypes.object,
  queryRestaurant: PropTypes.func,
  restaurant: PropTypes.object,
}

const mapStateToProps = state => ({
  loading: state.getIn(['restaurant', 'loading']),
  restaurant: state.getIn(['restaurant', 'detail'])
})

const mapDispatchToProps = {
  queryRestaurant
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RestaurantDetail);