const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");

const mongoURI = `${process.env.DATABASE}`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

///Middleware
app.use(express.json());

///Middleware to sanitize
app.use(xss());
app.use(mongoSanitize());

///routes | should be after parsing and sanitization
app.use("/api", routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
