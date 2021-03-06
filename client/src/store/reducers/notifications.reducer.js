import { CLEAR_NOTIFICATIONS, ERROR_GLOBAL, SUCCESS_GLOBAL } from "../types";

export default function notificationsReducer(state = {}, action) {
  switch (action.type) {
    case ERROR_GLOBAL:
      return { ...state, error: true, msg: action.payload };

    case SUCCESS_GLOBAL:
      return { ...state, success: true, msg: action.payload };

    case CLEAR_NOTIFICATIONS:
      return {};

    default:
      return state;
  }
}
