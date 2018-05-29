import {
  queryRestaurantsError,
  queryRestaurantsSuccess
} from './action';
import { QUERY_RESTAURANTS } from './constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

function* doQueryRestaurants({ param = {} }) {
  const response = yield call(request, 'https://mockapi.pizza.de/v1/restaurants ');
  if (response.error) {
    yield put(queryRestaurantsError(response.error));
    return;
  }
  yield put(queryRestaurantsSuccess(response.data));
}


export default function* homePageWatcher() {
  yield takeLatest(QUERY_RESTAURANTS, doQueryRestaurants);
}