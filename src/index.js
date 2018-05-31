import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router'
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import rootSaga from './saga';
import RestaurantList from './containers/RestaurantList'
import RestaurantDetail from './containers/RestaurantDetail';
import './style.scss';

const initialState = {};
const history = createBrowserHistory();
const store = configureStore(initialState, history);

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/restaurant" component={RestaurantDetail} />
        <Route path="/restaurants" component={RestaurantList} />
        <Redirect path="/" to="/restaurants" />
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));