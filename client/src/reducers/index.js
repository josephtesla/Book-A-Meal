import { combineReducers } from "redux";
import authReducer from "./auth";
import mealsReducer from "./meals";
import menuReducer from "./menu";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
  auth: authReducer,
  meals: mealsReducer,
  menu: menuReducer,
  orders: ordersReducer
});

export default rootReducer;