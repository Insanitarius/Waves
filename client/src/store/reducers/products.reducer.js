import {
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  GET_PROD_PAGINATE,
  ADD_PRODUCT,
  CLEAR_ADDED_PRODUCT,
} from "../types";

export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case GET_PROD_BY_SOLD:
      return { ...state, bySold: action.payload };
    case GET_PROD_BY_DATE:
      return { ...state, byDate: action.payload };
    case GET_PROD_PAGINATE:
      return { ...state, byPaginate: action.payload };
    //TODO
    case ADD_PRODUCT:
      return { ...state, lastAdded: action.payload };
    case CLEAR_ADDED_PRODUCT:
      return { ...state, lastAdded: null };
    default:
      return state;
  }
}
