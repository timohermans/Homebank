import rootReducer from "./rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import homebankSagas from "./sagas";

export function createNewStore() {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(homebankSagas);

  return store;
}
