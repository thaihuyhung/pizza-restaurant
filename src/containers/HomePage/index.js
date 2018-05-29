import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { queryRestaurants } from './action';
import { compose } from 'redux';
import { connect } from 'react-redux';

class HomePage extends Component {

  componentDidMount() {
    const { queryRestaurants } = this.props;
    queryRestaurants();
  }
  

  render() {
    return (
      <div>
        HomePage
      </div>
    );
  }
}

HomePage.propTypes = {
  queryRestaurants: PropTypes.func
}

const mapStateToProps = state => ({
  restaurants: state.getIn(['home', 'restaurants']),
  total: state.getIn(['home', 'restaurantsLoading'])
})

const mapDispatchToProps = {
  queryRestaurants
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);