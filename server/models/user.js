const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  role: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "",
  },
  lastname: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "",
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
