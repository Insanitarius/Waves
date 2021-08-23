const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = mongoose.Schema({
  model: {
    required: [true, "Model of the guitar is required"],
    type: String,
    unique: 1,
    maxlength: 250,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  frets: {
    required: true,
    type: Number,
  },
  woodtype: {
    type: String,
    required: true,
  },
  description: {
    required: [true, "You need a description"],
    type: String,
    maxlength: 5000,
  },
  price: {
    required: true,
    type: Number,
    maxlength: 255,
  },
  available: {
    required: [true, "Number of this guitar model in stock"],
    type: Number,
    maxlength: 5000,
    default: 0,
  },
  itemSold: {
    required: true,
    type: Number,
    default: 0,
  },
  shipping: {
    type: Boolean,
    required: [true, "Free shipping available or not"],
    default: false,
  },
  images: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
