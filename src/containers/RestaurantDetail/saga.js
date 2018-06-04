import {
  queryRestaurantError,
  queryRestaurantSuccess
} from './action';
import { QUERY_RESTAURANT } from './constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import utils from '../../utils';

function* doQueryRestaurant({ param }) {
  try {
    yield put(showLoading());
    const response = yield call(utils.request, 'https://mockapi.pizza.de/v1/restaurants/' + param.id);
    if (response.error) {
      yield put(queryRestaurantError(response.error));
      return;
    }
    yield put(queryRestaurantSuccess(response));
  } catch (error) {
    yield put(queryRestaurantError(error));
  } finally {
    yield put(hideLoading());
  }
}


export default function* restaurantsWatcher() {
  yield takeLatest(QUERY_RESTAURANT, doQueryRestaurant);
}