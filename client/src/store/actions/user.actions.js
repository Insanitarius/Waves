import axios from "axios";
import * as actions from "./index";
import {
  getAuthHeader,
  getTokenCookie,
  removeTokenCookie,
} from "../../utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const userRegister = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/auth/register`, {
        email: values.email,
        password: values.password,
      });

      dispatch(actions.userAuthenticate({ data: user.data.user, auth: true }));
      dispatch(
        actions.successGlobal("Welcome! Check your email to verify account!")
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userSignIn = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/auth/signin`, {
        email: values.email,
        password: values.password,
      });

      dispatch(actions.userAuthenticate({ data: user.data.user, auth: true }));
      if (user.data.user.verified) {
        dispatch(actions.successGlobal("Welcome back!"));
      } else {
        dispatch(
          actions.successGlobal("Welcome to Waves! Please verify your email!")
        );
      }
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userIsAuth = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie()) {
        throw new Error();
      }
      const user = await axios.get(`/api/auth/isauth`, getAuthHeader());
      dispatch(actions.userAuthenticate({ data: user.data, auth: true }));
    } catch (error) {
      dispatch(actions.userAuthenticate({ data: {}, auth: false }));
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(actions.userSignOut());
    dispatch(actions.successGlobal("Logged out successfully!"));
  };
};

export const userUpdateProfile = (data) => {
  return async (dispatch, getState) => {
    try {
      const profile = await axios.patch(
        `/api/users/profile`,
        { data: data },
        getAuthHeader()
      );

      const userData = {
        ...getState().users.data,
        firstname: profile.data.firstname,
        lastname: profile.data.lastname,
      };
      dispatch(actions.userUpdateProfile(userData));
      dispatch(actions.successGlobal("Profile updated successfully!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userChangeEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/users/email`,
        { newemail: data.newemail },
        getAuthHeader()
      );

      dispatch(actions.userChangeEmail(data.newemail));
      dispatch(
        actions.successGlobal(
          "Email updated successfully! Please verify your mail inorder to signin again!"
        )
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userAddToCart = (item) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      dispatch(actions.userAddToCart([...cart, item]));

      // await axios.patch(
      //   `/api/users/email`,
      //   { newemail: data.newemail },
      //   getAuthHeader()
      // );

      // dispatch(actions.userChangeEmail(data.newemail));
      dispatch(actions.successGlobal(`${item.model} added to cart!`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const removeFromCart = (position) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      const model = cart[position].model;
      cart.splice(position, 1);

      dispatch(actions.userAddToCart(cart));
      dispatch(actions.successGlobal(`${model} removed from cart!`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};


export const userPaymentSuccess = (orderID) =>{
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/transaction/`,{orderID},getAuthHeader())

      dispatch(actions.userPaymentSuccess(user.data));
      dispatch(actions.successGlobal("Payment Successful!!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
}