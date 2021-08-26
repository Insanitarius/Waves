import axios from "axios";
import * as actions from "./index";

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
