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
import RestaurantListSkeleton from './skeleton/index'
import Image from 'src/components/Image';
import './style';
import SkeletonLoading from '../../components/SkeletonLoading';
import Pagination from 'src/components/Pagination';
import NotFoundMessage from 'src/components/NotFoundMessage'

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fromJS({
        filteredRestaurants: [],
        filterItems: [],
        filterLabel: 'Filter',
        sortItem: null,
        sortLabel: 'Sort',
        page: 1,
        pageSize: 5
      })
    }
    this.sortOptions = fromJS([{
      key: 'nameASC',
      value: 'Name A-Z'
    }, {
      key: 'nameDESC',
      value: 'Name Z-A'
    }, {
      key: 'reviewASC',
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
    const { restaurants, history, categories } = this.props;

    // Make sure we do the filter after we got data from BE
    if (!prevProps.restaurants.equals(restaurants)) {
      const searchQuery = queryString.parse(history.location.search, { arrayFormat: 'bracket' });
      const searchQueryMap = fromJS(searchQuery);

      // Get query data
      const filterItems = searchQueryMap.get('filter', fromJS([]));
      const sortItem = searchQueryMap.get('sort');
      const page = Math.max(parseInt(searchQueryMap.get('page', 1)), 1);
      const pageSize = parseInt(searchQueryMap.get('pageSize', 5));

      // Validate data
      const validFilterItems = filterItems.filter(item => categories.includes(item));
      const validSortItem = this.sortOptions.findIndex(item => item.get('key') === sortItem) > -1 ? sortItem : '';
      const validPage = isNaN(page) ? 1 : page;
      // Temporary hardcode pageSize options 
      const validPageSize = isNaN(pageSize) || [5, 10, 20, 50].indexOf(pageSize) < 0 ? 5 : pageSize;

      this.filter(validFilterItems, validSortItem, validPage, validPageSize);
    }
  }

  /**
   * @function onUpdateFilter
   * @param  string option selected filter item
   * @description Method handle action after user update filter select box
   */
  onUpdateFilter = (option) => {
    const { data } = this.state;
    const filterItems = data.get('filterItems');
    const selectedIndex = filterItems.findIndex(item => item === option.get('key'));
    /**
     * Whenever user update filter, if that particular selection is existed, it means the action is unselect and vice versa
     */
    if (selectedIndex > -1) {
      this.filter(filterItems.delete(selectedIndex), data.get('sortItem'), data.get('page'), data.get('pageSize'));
    } else {
      this.filter(filterItems.push(option.get('key')), data.get('sortItem'), data.get('page'), data.get('pageSize'));
    }
  }

  /**
   * @function onUpdateSort
   * @param  string option selected sort item
   * @description Method handle action after user update sort select box
   */
  onUpdateSort = (option) => {
    const { data } = this.state;
    this.filter(data.get('filterItems'), option.get('key'), data.get('page'), data.get('pageSize'));
  }

  /**
   * @function filter
   * @param  object filterItems List of selected filter items (immutable list)
   * @param  string sortItem    Selected sort item
   * @param  number page        Current page number
   * @param  number pageSize    Current page size
   * @description Logic for client filter based on data response and filter/sort select box
   */
  filter = (filterItems, sortItem, page, pageSize) => {
    const { restaurants } = this.props;

    /**
     * The logic is filter all the restaurant which has category is included in filter list.
     * The category is responsed as an comma separated string inside an array. 
     * For real project, BE should simple provide the array of category like the response of restaurant detail.
    */

    const filteredRestaurants = !filterItems.size ? restaurants : restaurants
      .filter(res => res.getIn(['general', 'categories'], []).get(0, '').split(',')
        .some(category => filterItems.includes(category)));

    /**
     * Remove dash(-) between category words to make it more friendly with user.  
     */    
    const filterLabel = filterItems.size === 0 ?
      'Filter' : filterItems.size === 1 ?
        `Filter by ${filterItems.first().replace(/-/g, ' ')}` : `Filter by ${filterItems.size} items`;

    const selectedSortItem = this.sortOptions.find(x => x.get('key') === sortItem);
    const sortLabel = !sortItem || !selectedSortItem ? 'Sort' : selectedSortItem.get('value');

    /**
     * Need to validate page again after we got the list of response.
     * Avoid the case user enter a big page number
    */ 
    const validPage = Math.min(Math.ceil(filteredRestaurants.size / pageSize), page);

    // Update Query String in URL
    this.updateSearchQuery(filterItems, sortItem, validPage, pageSize);

    this.setState(({ data }) => ({
      data: data
        .update('sortItem', () => sortItem)
        .update('sortLabel', () => sortLabel)
        .update('filterLabel', () => filterLabel)
        .update('filterItems', () => filterItems)
        .update('page', () => validPage)
        .update('pageSize', () => pageSize)
        .update('filteredRestaurants', () => this.sort(filteredRestaurants, sortItem))
    }))
  }

  /**
   * @function updateSearchQuery
   * @param  object filterItems List of selected filter items (immutable list)
   * @param  string sortItem    Selected sort item
   * @param  number page        Current page number
   * @param  number pageSize    Current page size
   * @description This method will prepare the new query string and update it on browser url
   */
  updateSearchQuery = (filterItems, sortItem, page, pageSize) => {
    const { history } = this.props;
    let queryObject = {};

    /**
     * We do assign each param one by one to make the url more clean.
     * For example, page=1 and pageSize=5 is default value, no need to show it on query string
     */
    if (filterItems) {
      queryObject = {...queryObject, filter: filterItems.toArray()}
    }
    if (sortItem) {
      queryObject = {...queryObject, sort: sortItem}
    }
    if (page && page !== 1) {
      queryObject = {...queryObject, page }
    }
    if (pageSize && pageSize !== 5) {
      queryObject = {...queryObject, pageSize }
    }
    const searchQuery = queryString.stringify(queryObject, { arrayFormat: 'bracket' });

    history.push({
      search: searchQuery
    });
  }

  /**
   * @function compareName
   * @param  object a a
   * @param  object b b
   * @return object sorted list
   * @description compareFunction for built in sort mthod. Sort restaurant by name
   */
  compareName = (a, b) => a.getIn(['general', 'name']).localeCompare(b.getIn(['general', 'name']));

  /**
   * @function compareName
   * @param  object a a
   * @param  object b b
   * @param  bool asc whether it's ascending or descending
   * @return object sorted list
   * @description compareFunction for built in sort mthod. Sort restaurant by review
   */
  compareReview = (a, b, asc) => {
    const reviewA = parseFloat(a.getIn(['rating', 'average']));
    const reviewB = parseFloat(b.getIn(['rating', 'average']));
    return asc ? reviewA - reviewB : reviewB - reviewA;
  }

  /**
   * @function sort
   * @param  object list source list
   * @param  string key  sort type
   * @return object sorted list
   */
  sort = (list, key) => {
    switch (key) {
      case 'nameASC':
        return list.sort(this.compareName);
      case 'nameDESC':
        return list.sort(this.compareName).reverse();
      case 'reviewASC':
        return list.sort((a, b) => this.compareReview(a, b, true));
      case 'reviewDESC':
        return list.sort(this.compareReview);
      default:
        return list;
    }
  }

  /**
   * @function onNavigatePagination
   * @param  number page new page 
   * @description Handle action when user navigate to another page
   */
  onNavigatePagination = (page) => {
    /**
     * Make it scroll to top because user want to see the whole list from top after navigation.
     * So they don't have to do unnecessary scroll. Improving UX
     */
    window.scrollTo(0, 0);
    this.setState(({ data }) => ({
      data: data.update('page', () => page)
    }), () => {
      const { data } = this.state;
      this.updateSearchQuery(data.get('filterItems'), data.get('sortItem'), page, data.get('pageSize'))
    });
  }

  /**
   * @function onChangePageSize
   * @param  number pageSize new page size
   * @description Handle action when user update page size
   */
  onChangePageSize = (pageSize) => {
    this.setState(({ data }) => ({
      data: data.update('pageSize', () => pageSize)
    }), () => {
      const { data } = this.state;
      this.updateSearchQuery(data.get('filterItems'), data.get('sortItem'), data.get('page'), pageSize)
    });
  }

  /**
   * @function renderPagination
   * @description Render pagination
   */
  renderPagination = () => {
    const { data } = this.state;
    const filteredRestaurants = data.get('filteredRestaurants');
    const page = data.get('page');
    const pageSize = data.get('pageSize');
    return (
      <Pagination
        page={page}
        pageSize={pageSize}
        total={filteredRestaurants.size}
        onChangePageSize={this.onChangePageSize}
        onNavigate={this.onNavigatePagination}
      />
    );
  }

  /**
   * @function renderItems
   * @description Render list of restaurant
   */
  renderItems = () => {
    const { data } = this.state;
    const { history } = this.props;
    const pageSize = data.get('pageSize');
    const page = data.get('page');
    const offset = (page - 1) * pageSize;
    const filteredRestaurants = data.get('filteredRestaurants');

    // Temporary fix for data issue form BE, key must be unique
    return filteredRestaurants
      .slice(offset, offset + pageSize)
      .map((restaurant, index) => 
        <RestaurantItem key={restaurant.get('id') + '-' + index} data={restaurant} history={history} />
      );
  }

  /**
   * @function renderErrorTemplate
   * @description Render error page in case of any issue from request
   */
  renderErrorTemplate = () => {
    return (
      <div key="error" className="res-list">
        <div className="res-list--error">
          <NotFoundMessage />
        </div>
      </div>
    )
  }

  /**
   * @function renderContent
   * @description Render content of the page
   */
  renderContent = () => {
    const { categories } = this.props;
    const { data } = this.state;
    const filteredRestaurants = data.get('filteredRestaurants');
    const filterItems = data.get('filterItems');
    const sortItem = data.get('sortItem');

    // No need to render these HTML if we don't have any restaurant.
    if (!filteredRestaurants.size) {
      return null;
    }
    return (
      <div key="content" className="res-list">
        <Image className="res-list__logo" src={logo} />
        <div className="res-list__header">
          <div className="res-list__result-msg">We found <b>{filteredRestaurants.size}</b> restaurants for you</div>
          <div className="res-list__actions">
            <Select
              className="res-list__action"
              label={data.get('filterLabel')}
              options={categories}
              selectedItems={filterItems}
              multiple
              onChange={this.onUpdateFilter} />
            <Select
              className="res-list__action"
              label={data.get('sortLabel')}
              options={this.sortOptions}
              selectedItem={sortItem}
              onChange={this.onUpdateSort}
            />
          </div>
        </div>
        {this.renderItems()}
        {this.renderPagination()}
      </div>
    )
  }

  /**
   * @function render
   * @description Render the whole page, which includes the skeleton loading
   */
  render() {
    const { loading, restaurants } = this.props;
    return (
      <SkeletonLoading
        loading={loading}
        skeletonTemplate={<RestaurantListSkeleton />}
        hasError={(!loading && !restaurants)}
        errorTemplate={this.renderErrorTemplate()}>
        {this.renderContent()}
      </SkeletonLoading>
    );
  }
}

RestaurantList.propTypes = {
  queryRestaurants: PropTypes.func,
  restaurants: PropTypes.object,
  categories: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool
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