import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { queryRestaurants } from './action';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import queryString from 'query-string';
import RestaurantItem from 'src/components/RestaurantItem';
import Select from 'src/components/Select';
import logo from 'assets/logo.jpg';
import './style';

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.sortRef = React.createRef();
    this.state = {
      data: fromJS({
        filteredRestaurants: [],
        filterItems: [],
        filterLabel: 'Filter',
        sortItem: null,
        sortLabel: 'Sort'
      })
    }
    this.sortOptions = fromJS([{
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
  }

  componentDidMount() {
    const { queryRestaurants } = this.props;
    queryRestaurants();
  }

  componentDidUpdate(prevProps) {
    const { restaurants, history } = this.props;
    if (!prevProps.restaurants.equals(restaurants)) {
      const searchQuery = queryString.parse(history.location.search, {arrayFormat: 'bracket'});
      const searchQueryMap = fromJS(searchQuery);
      this.filter(searchQueryMap.get('filter', fromJS([])), searchQueryMap.get('sort'));
    }
  }

  onUpdateFilter = (option) => {
    const { data } = this.state;
    const filterItems = data.get('filterItems');
    const selectedIndex = filterItems.findIndex(item => item === option.get('key'));
    if (selectedIndex > -1) {
      this.filter(filterItems.delete(selectedIndex), data.get('sortItem'));
    } else {
      this.filter(filterItems.push(option.get('key')), data.get('sortItem'));
    }
  }

  onUpdateSort = (option) => {
    this.sortRef.current.handleToggleSelect();
    const { data } = this.state;
    this.filter(data.get('filterItems'), option.get('key'));
  }

  filter = (filterItems, sortItem) => {
    const { restaurants, history } = this.props;
    const filteredRestaurants = !filterItems.size ? restaurants : restaurants
      .filter(res => res.getIn(['general', 'categories'], []).get(0, '').split(',')
        .some(category => filterItems.includes(category)));
    const filterLabel = filterItems.size === 0 ? 
      'Filter' : filterItems.size === 1 ? 
        `Filter by ${filterItems.first().replace(/-/g, ' ')}` : `Filter by ${filterItems.size} items`;
    const sortLabel = !sortItem ? 'Sort' : this.sortOptions.find(x => x.get('key') === sortItem).get('value');
    
    const searchQuery = this.formSearchQuery(filterItems, sortItem);
    history.push({
      search: searchQuery
    });

    this.setState(({ data }) => ({
      data: data
        .update('sortItem', () => sortItem)
        .update('sortLabel', () => sortLabel)
        .update('filterLabel', () => filterLabel)
        .update('filterItems', () => filterItems)
        .update('filteredRestaurants', () => this.sort(filteredRestaurants, sortItem))
    }))
  }

  sort = (list, key) => {
    switch (key) {
      case 'nameASC':
        return list.sort(((a, b) => a.getIn(['general', 'name']).localeCompare(b.getIn(['general', 'name']))));
      case 'nameDESC':
        return list.sort(((a, b) => a.getIn(['general', 'name']).localeCompare(b.getIn(['general', 'name'])))).reverse(); 
      case 'reviewACS':
        return list.sort(((a, b) => parseFloat(a.getIn(['rating', 'average'])) - parseFloat(b.getIn(['rating', 'average']))));
      case 'reviewDESC':
        return list.sort(((a, b) => parseFloat(a.getIn(['rating', 'average'])) - parseFloat(b.getIn(['rating', 'average']))));  
      default:
        return list;
    }
  }

  formSearchQuery = (filterItems, sortItem) => {
    return queryString.stringify({
      filter: filterItems.toArray(),
      sort: sortItem
    }, {arrayFormat: 'bracket'});
  }
  
  render() {
    const { categories } = this.props;
    const { data } = this.state;
    const filteredRestaurants = data.get('filteredRestaurants');
    const filterItems = data.get('filterItems');
    const sortItem = data.get('sortItem');
    return (
      <div className="res-list">
        <img className="res-list__logo" src={logo} />
        <div className="res-list__header">
          <div>We found {filteredRestaurants.size} restaurants for you</div>
          <div className="res-list__actions">
            <Select 
              className="res-list__action" 
              label={data.get('filterLabel')} 
              options={categories}
              selectedItems={filterItems}
              multiple 
              onChange={this.onUpdateFilter} />
            <Select 
              ref={this.sortRef}
              className="res-list__action" 
              label={data.get('sortLabel')} 
              options={this.sortOptions} 
              selectedItem={sortItem}
              onChange={this.onUpdateSort}
            />
          </div>
        </div>
        {
          !!filteredRestaurants.size &&
          filteredRestaurants.map((restaurant, index) => <RestaurantItem key={index} data={restaurant} />)
        }
      </div>
    );
  }
}

RestaurantList.propTypes = {
  queryRestaurants: PropTypes.func,
  restaurants: PropTypes.object,
  categories: PropTypes.object,
  history: PropTypes.object,
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