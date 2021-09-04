const { ApiError } = require("../middleware/apiError");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (token) => {
  return jwt.verify(token, process.env.SECRET);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserById = async (_id) => {
  return await User.findById(_id);
};

const updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          firstname: req.body.data.firstname,
          lastname: req.body.data.lastname,
        },
      },
      { new: true }
    );

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (req) => {
  try {
    if (await User.emailTaken(req.body.newemail)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Sorry, the email already taken"
      );
    }

    const user = await Product.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        $set: {
          email: req.body.newemail,
          verified: false,
        },
      },
      { new: true }
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const addToCart = async (req) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      email: req.user.email,
    });

    user.cart.map((item) => {
      if (item.model === req.body.model)
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Item already in cart");
    });

    const product = await Product.findOneAndUpdate(
      {
        model: req.body.model,
      },
      {
        $inc: {
          available: -1,
        },
      },
      { new: true }
    );

    if (product.available < 0) {
      await Product.findOneAndUpdate(
        {
          model: item.name,
        },
        {
          $inc: {
            available: 1,
          },
        }
      );
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Item out of stock");
    }

    user.cart.push(product);
    user.save();

    return user.cart;
  } catch (error) {
    throw error;
  }
};

const removeFromCart = async (req) => {
  try {
    await Product.findOneAndUpdate(
      {
        model: req.body.model,
      },
      {
        $inc: {
          available: 1,
        },
      }
    );

    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        $pull: {
          cart: {
            model: req.body.model,
          },
        },
      },
      { new: true }
    );

    return user.cart;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  validateToken,
  addToCart,
  removeFromCart,
};
