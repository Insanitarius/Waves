import {
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATIONS,
} from "../types";

/////////////////////////////////Products/////////////////////////////////

export const productsBySold = (data) => ({
  type: GET_PROD_BY_SOLD,
  payload: data,
});

export const productsByDate = (data) => ({
  type: GET_PROD_BY_DATE,
  payload: data,
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
