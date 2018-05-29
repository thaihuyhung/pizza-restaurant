import {
  QUERY_RESTAURANTS,
  QUERY_RESTAURANTS_ERROR,
  QUERY_RESTAURANTS_SUCCESS
} from './constant';
import { fromJS } from 'immutable';

const initialState = fromJS({
  restaurants: [],
  restaurantsLoading: true
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_RESTAURANTS:
      return state
        .set('restaurantsLoading', true);
    case QUERY_RESTAURANTS_SUCCESS:
      return state
        .set('restaurants', fromJS(action.data));
    case QUERY_RESTAURANTS_ERROR:
      return state
        .set('restaurantsLoading', false)
        .set('restaurants', fromJS(null));
    default:
      return state;
  }
}

export default homePageReducer;