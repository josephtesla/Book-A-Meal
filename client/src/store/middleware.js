import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const middlewareList = [thunk];

if (process.env.NODE_ENV !== "production"){
  middlewareList.push(createLogger());
}

const middleware = compose(applyMiddleware(...middlewareList));
export default middleware;