import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './containers/App/configureStore';
import createHistory from 'history/createBrowserHistory'
import rootSaga from './containers/App/saga';
import App from './containers/App';

const initialState = {};

const history = createHistory();

const store = configureStore(initialState, history);

store.runSaga(rootSaga);

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));