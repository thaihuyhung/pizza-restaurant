import {
  QUERY_RESTAURANT,
  QUERY_RESTAURANT_ERROR,
  QUERY_RESTAURANT_SUCCESS
} from './constant';
import { fromJS } from 'immutable';

const initialState = fromJS({
  detail: null,
  loading: true
});

function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_RESTAURANT:
      return state
        .set('loading', true);
    case QUERY_RESTAURANT_SUCCESS: {
      return state
        .set('loading', false)
        .set('detail', fromJS(action.data))
    }
    case QUERY_RESTAURANT_ERROR:
      return state
        .set('loading', false)
        .set('detail', fromJS(null))
    default:
      return state;
  }
}

export default restaurantReducer;