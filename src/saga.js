import { all, fork } from "redux-saga/lib/effects";
import restaurantsWatcher from  './containers/RestaurantList/saga';

export default function* rootSaga() {
  yield all([
    fork(restaurantsWatcher)
  ]);
}
