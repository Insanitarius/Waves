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
        actions.successGlobal(
          "Welcome to Waves! Please check your email to verify account!"
        )
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
          actions.successGlobal(
            "Welcome back! Don't forget to verify your email!"
          )
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
      const site = await axios.get(`/api/site`);
      dispatch(actions.getSiteVars(site.data));
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
          "Email updated successfully. Please verify your new email!"
        )
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userAddToCart = (item) => {
  return async (dispatch) => {
    try {
      const cart = await axios.post(
        `/api/users/addtocart`,
        { model: `${item.model}` },
        getAuthHeader()
      );
      console.log(cart);
      dispatch(actions.userUpdateCart(cart.data));
      dispatch(actions.successGlobal(`${item.model} added to cart!`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const removeFromCart = (model) => {
  return async (dispatch) => {
    try {
      const cart = await axios.post(
        `/api/users/removefromcart`,
        { model: model },
        getAuthHeader()
      );
      dispatch(actions.userUpdateCart(cart.data));
      dispatch(actions.successGlobal(`${model} removed from cart!`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userPaymentSuccess = (orderID) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(
        `/api/transaction/`,
        { orderID },
        getAuthHeader()
      );

      dispatch(actions.userPaymentSuccess(user.data));
      dispatch(actions.successGlobal("Payment Successful!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userAccountVerify = (token) => {
  return async (dispatch, getState) => {
    try {
      const verify = getState().users.data.verified;

      if (!verify) {
        await axios.get(`/api/users/verify?validation=${token}`);
        dispatch(actions.userAccountVerify());
        dispatch(actions.successGlobal("Account verified successfully!"));
      } else {
        dispatch(actions.successGlobal("Account already verified!"));
      }
    } catch (error) {
      if (error.response.data.message === "invalid signature")
        dispatch(actions.errorGlobal("Incorrect authentication token."));
      else
        dispatch(
          actions.errorGlobal("Token expired. Please revalidate your email!")
        );
    }
  };
};

export const resendVerification = () => {
  return async (dispatch, getState) => {
    try {
      const user = getState().users.data;
      console.log(user);
      await axios.post(
        `/api/users/revalidate`,
        { email: user.email },
        getAuthHeader()
      );
      dispatch(
        actions.successGlobal(
          "Verification mail sent successfully. Please check your email!"
        )
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.messages));
    }
  };
};
