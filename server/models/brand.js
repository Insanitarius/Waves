const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = { Brand };
