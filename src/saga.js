import { all, fork } from "redux-saga/lib/effects";
import restaurantsWatcher from  './containers/RestaurantList/saga';
import restaurantWatcher from  './containers/RestaurantDetail/saga';

export default function* rootSaga() {
  yield all([
    fork(restaurantsWatcher),
    fork(restaurantWatcher)
  ]);
}
