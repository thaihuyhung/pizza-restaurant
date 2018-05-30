import {
  QUERY_RESTAURANTS,
  QUERY_RESTAURANTS_ERROR,
  QUERY_RESTAURANTS_SUCCESS
} from './constant';
import { fromJS, Map as ImmutableMap } from 'immutable';

const initialState = fromJS({
  list: [],
  categories: [],
  loading: true
});

function restaurantsReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_RESTAURANTS:
      return state
        .set('loading', true);
    case QUERY_RESTAURANTS_SUCCESS: {
      const list = fromJS(action.data.data);
      const categories = list.flatMap(item =>
        item.getIn(['general', 'categories'], [])
          .get(0, '')
          .split(','))
          .toSet()
          .toList().map(x => ImmutableMap({
            key: x,
            value: x.replace(/-/g, ' ')
          }));
      return state
        .set('loading', false)
        .set('categories', categories)
        .set('list', list);
    }
    case QUERY_RESTAURANTS_ERROR:
      return state
        .set('loading', false)
        .set('categories', fromJS([]))
        .set('list', fromJS([]));
    default:
      return state;
  }
}

export default restaurantsReducer;