import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import RootReducer from "./reducers/rootReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];
const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof RootReducer>;

export default store;
