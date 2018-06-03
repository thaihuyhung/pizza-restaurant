import { all, fork } from "redux-saga/lib/effects";
import restaurantsWatcher from  'src/containers/RestaurantList/saga';
import restaurantWatcher from  'src/containers/RestaurantDetail/saga';

export default function* rootSaga() {
  yield all([
    fork(restaurantsWatcher),
    fork(restaurantWatcher)
  ]);
}
