import {
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  USER_UPDATE_CART,
  PAYMENT_SUCCESS,
  USER_ACCOUNT_VERIFY,
} from "../types";

let DEFAULT_USER_STATE = {
  data: {
    email: null,
    firstname: null,
    lastname: null,
    history: [],
    verified: null,
  },
  auth: null,
};

export default function usersReducer(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };
    case SIGN_OUT:
      return {
        ...state,
        data: { ...DEFAULT_USER_STATE.data },
        auth: false,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        data: { ...action.payload },
      };
    case USER_CHANGE_EMAIL:
      return {
        ...state,
        data: { ...state.data, email: action.payload },
      };
    case USER_UPDATE_CART:
      return { ...state, data: { ...state.data, cart: action.payload } };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        data: { ...state.data, history: action.payload.history, cart: [] },
      };
    case USER_ACCOUNT_VERIFY:
      return { ...state, data: { ...state.data, verified: true } };
    default:
      return state;
  }
}
