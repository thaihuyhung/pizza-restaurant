import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import RestaurantInfo from '../../components/RestaurantInfo';
import Image from '../../components/Image';
import './style';

const RestaurantItem = ({ data, history }) => {
  /**
   * The category is responsed as an comma separated string inside an array.
   * For real project, BE should simple provide the array of category like the response of restaurant detail.
  */
  const categories = data
    .getIn(['general', 'categories'], [])
    .get(0, '')
    .split(',');
  const uniqueCategories = [...new Set(categories)];
  const online = data.getIn(['general', 'online']);

  const onSelect = () => {
    history.push({
      pathname: `/restaurant/${data.get('id')}`
    });
  }
  return (
    <div className="res-item" onClick={onSelect}>
      <Image className="res-item__logo" src={data.getIn(['general', 'logo_uri'])} />
      <div className={online ? 'res-item--online' : 'res-item--offline'}></div>
      <div className="res-item__header--xs">
          <div className="res-item__name">
            {data.getIn(['general', 'name'])}
          </div>
          <Rating data={data.get('rating')} />
      </div>
      <div className="res-item__main-info">
        <div className="res-item__header">
          <div className="res-item__name">
            {data.getIn(['general', 'name'])}
          </div>
          <Rating data={data.get('rating')} />
        </div>
        <RestaurantInfo
          address={data.get('address')}
          categories={uniqueCategories}
          open={data.getIn(['general', 'open'])}
          minimumForOrder={data.get('min_order_value')}
        />
      </div>
    </div>
  );
};

RestaurantItem.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
}

export default RestaurantItem;