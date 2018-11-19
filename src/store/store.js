import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../reducers/rootReducers";

export default () => {
  return createStore(RootReducer, compose(applyMiddleware(thunk)));
};
