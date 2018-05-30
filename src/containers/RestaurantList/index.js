import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { queryRestaurants } from './action';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import RestaurantItem from 'src/components/RestaurantItem';
import Select from 'src/components/Select';
import logo from 'assets/logo.jpg';
import './style';

class RestaurantList extends Component {

  componentDidMount() {
    const { queryRestaurants } = this.props;
    queryRestaurants();
  }
  
  render() {
    const { restaurants, categories } = this.props;
    const sortOptions = fromJS([{
      key: 'nameASC',
      value: 'Name A-Z'
    }, {
      key: 'nameDESC',
      value: 'Name Z-A'
    }, {
      key: 'reviewACS',
      value: 'Review low to high'
    }, {
      key: 'reviewDESC',
      value: 'Review high to low'
    }])
    return (
      <div className="res-list">
        <div>
          <img className="res-list__logo" src={logo} />
        </div>
        <div className="res-list__actions">
          <Select className="res-list__action" label="Filter" options={categories} multiple />
          <Select className="res-list__action" label="Sort" options={sortOptions} />
        </div>
        {
          !!restaurants.size &&
          restaurants.map((resraurant, index) => <RestaurantItem key={index} data={resraurant} />)
        }
      </div>
    );
  }
}

RestaurantList.propTypes = {
  queryRestaurants: PropTypes.func,
  restaurants: PropTypes.object,
  categories: PropTypes.object,
}

const mapStateToProps = state => ({
  restaurants: state.getIn(['restaurants', 'list']),
  categories: state.getIn(['restaurants', 'categories']),
  loading: state.getIn(['restaurants', 'loading'])
})

const mapDispatchToProps = {
  queryRestaurants
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RestaurantList);