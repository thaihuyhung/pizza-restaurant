import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List as ImmutableList } from 'immutable';
import utils from 'src/utils';
import './style';

const currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

const RestaurantInfo = props => {
  const { address, categories, openingTime, open, minimumForOrder } = props;
  const addressString = utils.getAddressString(address);
  const min = currencyFormatter.format(minimumForOrder);
  const categoriesString = categories
    .map(cat => cat.replace(/-/g, ' '))
    .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
    .join(', ');
  return (
    <div className="restaurant-info">
      <div className="restaurant-info__line">
        <i className="material-icons restaurant-info__icon">location_on</i>
        <a
          className="link"
          onClick={event => event.stopPropagation()}
          href={`https://www.google.com/maps/place/${addressString}`}
          target="_blank"
          rel="noopener noreferrer"
        >{addressString}</a>
      </div>
      <div className="restaurant-info__line">
        <i className="material-icons">room_service</i>
        <span>{categoriesString}</span>
      </div>
      <div className="restaurant-info__line">
        <i className="material-icons">access_time</i>
        <span
          className={classNames('restaurant-info__opening-status',
            { 'restaurant-info__opening-status--closed': !open })}>
          {open ? 'Open' : 'Closed'}
        </span>
        {
          openingTime && <span>{openingTime}</span>
        }
      </div>
      <div className="restaurant-info__line">
        <i className="material-icons">shopping_cart</i>
        <span>Minimum {min} for orders</span>
      </div>
    </div>
  );
};

RestaurantInfo.propTypes = {
  address: PropTypes.object,
  categories: PropTypes.array,
  minimumForOrder: PropTypes.number,
  open: PropTypes.bool,
  openingTime: PropTypes.string,
};

RestaurantInfo.defaultProps = {
  categories: ImmutableList
};

export default RestaurantInfo;