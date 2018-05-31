import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Category from '../Category';
import Rating from '../Rating';
import './style';

class RestaurantItem extends Component {
  render() {
    const { data } = this.props;
    const address = `${data.getIn(['address', 'street_number'])} 
    ${data.getIn(['address', 'street_name'])} 
    ${data.getIn(['address', 'city'])}`;
    const categories = data.getIn(['general', 'categories'], []).get(0, '').split(',');
    const uniqueCategories = [...new Set(categories)]; 
    return (
      <div className="res-item">
        <img className="res-item__logo" src={data.getIn(['general', 'logo_uri'])} />
        <div className="res-item__info">
          <div>
            <div className="res-item__header">
              <Link to={`/restaurant/${data.get('id')}`} className="res-item__name">
                {data.getIn(['general', 'name'])}
              </Link>
              <Rating data={data.get('rating')} />
            </div>
            <div className="res-item__address">
              <i className="material-icons">location_on</i>
              <a 
                className="link"
                href={`https://www.google.com/maps/search/${data.getIn(['address', 'latitude'])},${data.getIn(['address', 'longitude'])}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >{address}</a>
            </div>
          </div>
          <div className="res-item__categories">
            <i className="material-icons">room_service</i>
            {
              !!uniqueCategories.length && uniqueCategories.map(category => 
              <Category key={category} data={category} className="res-item__category" />)
            }
          </div>
        </div>
      </div>
    );
  }
}

RestaurantItem.propTypes = {
  data: PropTypes.object
}

export default RestaurantItem;