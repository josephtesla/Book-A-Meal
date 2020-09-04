import { createStore } from "redux";
import rootReducer from "../reducers"
import middleware from "./middleware";

const configStore = (initialState) => {
  const store = createStore(rootReducer, initialState, middleware);
  return store;
}

export default configStore;