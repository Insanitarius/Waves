import {
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  GET_PROD_PAGINATE,
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  CLEAR_ADDED_PRODUCT,
  GET_ALL_BRANDS,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATIONS,
} from "../types";

/////////////////////////////////User/////////////////////////////////

export const userAuthenticate = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const userSignOut = () => ({
  type: SIGN_OUT,
});

export const userUpdateProfile = (userData) => ({
  type: UPDATE_USER_PROFILE,
  payload: userData,
});

export const userChangeEmail = (data) => ({
  type: USER_CHANGE_EMAIL,
  payload: data,
});

/////////////////////////////////Products/////////////////////////////////

export const productsBySold = (data) => ({
  type: GET_PROD_BY_SOLD,
  payload: data,
});

export const productsByDate = (data) => ({
  type: GET_PROD_BY_DATE,
  payload: data,
});

export const productsByPaginate = (products) => ({
  type: GET_PROD_PAGINATE,
  payload: products,
});

export const removeProduct = () => ({
  type: REMOVE_PRODUCT,
});

//TODO
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const clearAddedProduct = () => {
  return {
    type: CLEAR_ADDED_PRODUCT,
  };
};

/////////////////////////////////Brands/////////////////////////////////
export const getAllBrands = (brands) => ({
  type: GET_ALL_BRANDS,
  payload: brands,
});

/////////////////////////////////Notificaions/////////////////////////////////

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotifcations = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
  };
};
