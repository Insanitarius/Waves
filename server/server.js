const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");
const passport = require("passport");

const { handleError, convertToApiError } = require("./middleware/apiError");
const { jwtStrategy } = require("./middleware/passport");

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

//Passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

///routes | should be after parsing and sanitization
app.use("/api", routes);

/////HANDLE ERROR | should be at the END
////If error is not recognized..... convert to api error
app.use(convertToApiError);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
