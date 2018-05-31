import {
  queryRestaurantError,
  queryRestaurantSuccess
} from './action';
import { QUERY_RESTAURANT } from './constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

function* doQueryRestaurant({ param }) {
  try {
    const response = yield call(request, 'https://mockapi.pizza.de/v1/restaurants/' + param.id);
    if (response.error) {
      yield put(queryRestaurantError(response.error));
      return;
    }
    yield put(queryRestaurantSuccess(response));
  } catch (error) {
    yield put(queryRestaurantError(error));
  }
}


export default function* restaurantsWatcher() {
  yield takeLatest(QUERY_RESTAURANT, doQueryRestaurant);
}