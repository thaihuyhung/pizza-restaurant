import {
  QUERY_RESTAURANTS,
  QUERY_RESTAURANTS_ERROR,
  QUERY_RESTAURANTS_SUCCESS
} from './constant';

export function queryRestaurants() {
  return {
    type: QUERY_RESTAURANTS
  };
}

export function queryRestaurantsSuccess(data) {
  return {
    type: QUERY_RESTAURANTS_SUCCESS,
    data
  };
}

export function queryRestaurantsError(error) {
  return {
    type: QUERY_RESTAURANTS_ERROR,
    error
  };
}