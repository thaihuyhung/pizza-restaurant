import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from  './reducer'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    fromJS(initialState),
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}