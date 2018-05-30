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
        <Route exact path="/restaurant" component={RestaurantDetail} />
        <Route exact path="/restaurants" component={RestaurantList} />
        <Redirect from="*" to="/restaurants"/>
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));