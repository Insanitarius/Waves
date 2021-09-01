import {
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  USER_ADD_TO_CART,
  PAYMENT_SUCCESS,
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  GET_PROD_PAGINATE,
  GET_PROD_BY_ID,
  CLEAR_PRODUCT_BY_ID,
  REMOVE_PRODUCT,
  ADD_PRODUCT,
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

export const userAddToCart = (data) => ({
  type: USER_ADD_TO_CART,
  payload: data,
});


export const userPaymentSuccess = (data)=>({
  type: PAYMENT_SUCCESS,
  payload: data,
})





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

export const productById = (product) => ({
  type: GET_PROD_BY_ID,
  payload: product,
});

export const clearProductById = () => {
  return {
    type: CLEAR_PRODUCT_BY_ID,
  };
};

//TODO

export const removeProduct = () => ({
  type: REMOVE_PRODUCT,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

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
