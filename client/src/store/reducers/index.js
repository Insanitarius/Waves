import { combineReducers } from "redux";
import notifications from "./notifications.reducer";
import products from "./products.reducer";
import users from "./users.reducer";

const appReducers = combineReducers({
  users,
  products,
  notifications,
});

export default appReducers;
