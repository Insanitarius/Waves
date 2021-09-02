import { combineReducers } from "redux";
import brands from "./brands.reducer";
import notifications from "./notifications.reducer";
import products from "./products.reducer";
import site from "./site.reducer";
import users from "./users.reducer";

const appReducers = combineReducers({
  users,
  products,
  notifications,
  brands,
  site
});

export default appReducers;
