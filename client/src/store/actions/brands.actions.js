import axios from "axios";
import * as actions from "./index";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAllBrands = () => {
  return async (dispatch) => {
    try {
      const brands = await axios.get(`/api/brands/all`);
      dispatch(actions.getAllBrands(brands.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
