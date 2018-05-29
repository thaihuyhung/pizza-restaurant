import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import rootSaga from './saga';
import HomePage from './containers/HomePage'
import './index.scss';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={HomePage} />
    </Router>
  </Provider>, document.getElementById('root'));