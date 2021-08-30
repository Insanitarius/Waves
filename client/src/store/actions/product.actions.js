import axios from "axios";
import * as actions from "./index";

import { getAuthHeader } from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const productsBySort = ({ limit, sortBy, order, where }) => {
  return async (dispatch) => {
    try {
      const products = await axios.get(`api/products/all`, {
        params: {
          limit,
          sortBy,
          order,
        },
      });

      switch (where) {
        case "bySold":
          dispatch(actions.productsBySold(products.data));
          break;
        case "byDate":
          dispatch(actions.productsByDate(products.data));
          break;
        default:
          return false;
      }
    } catch (error) {
      //error.response.data.message
      dispatch(actions.errorGlobal("Sorry something went wrong, try again!"));
    }
  };
};

export const productsByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const products = await axios.post(
        `/api/products/paginate/all`,
        args,
        getAuthHeader()
      );

      dispatch(actions.productsByPaginate(products.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/product/${id}`, getAuthHeader());
      dispatch(actions.removeProduct());
      dispatch(actions.successGlobal("Product deleted successfully!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const addProduct = (data) => {
  return async (dispatch) => {
    try {
      const product = await axios.post(`/api/products/`, data, getAuthHeader());
      //TODO
      dispatch(actions.addProduct(product.data));
      dispatch(actions.successGlobal("Product added successfully!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const productById = (id) => {
  return async (dispatch) => {
    try {
      const product = await axios.get(`/api/products/product/${id}`);
      dispatch(actions.productById(product.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const updateProduct = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/products/product/${id}`, values, getAuthHeader());
      dispatch(actions.successGlobal("Product updated successfully!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
