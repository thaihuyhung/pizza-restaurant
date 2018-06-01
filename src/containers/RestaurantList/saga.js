import {
  queryRestaurantsError,
  queryRestaurantsSuccess
} from './action';
import { QUERY_RESTAURANTS } from './constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import utils from 'src/utils';

function* doQueryRestaurants() {
  try {
    yield put(showLoading());
    const response = yield call(utils.request, 'https://mockapi.pizza.de/v1/restaurants');
    if (response.error) {
      yield put(queryRestaurantsError(response.error));
      return;
    }
    yield put(queryRestaurantsSuccess(response));
  } catch (error) {
    yield put(queryRestaurantsError(error));
  } finally {
    yield put(hideLoading());
  }
}


export default function* restaurantsWatcher() {
  yield takeLatest(QUERY_RESTAURANTS, doQueryRestaurants);
}