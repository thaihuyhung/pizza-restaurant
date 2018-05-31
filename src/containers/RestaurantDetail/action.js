import {
  QUERY_RESTAURANT,
  QUERY_RESTAURANT_ERROR,
  QUERY_RESTAURANT_SUCCESS
} from './constant';

export function queryRestaurant(param) {
  return {
    type: QUERY_RESTAURANT,
    param
  };
}

export function queryRestaurantSuccess(data) {
  return {
    type: QUERY_RESTAURANT_SUCCESS,
    data
  };
}

export function queryRestaurantError(error) {
  return {
    type: QUERY_RESTAURANT_ERROR,
    error
  };
}