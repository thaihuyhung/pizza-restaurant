
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from  './reducer'

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
  return {
    ...store,
    close: () => store.dispatch(END),
    runSaga: sagaMiddleware.run
  }
}