const { authService, emailService } = require("../services");
const httpStatus = require("http-status");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const users = await authService.createUser(email, password);
      const token = await authService.genAuthToken(users);

      ///HACK Sending email for verification
      await emailService.registerEmail(email, users);

      const user = getUserProps(users);
      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .send({ user });
    } catch (error) {
      next(error);
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const users = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.genAuthToken(users);
      const user = getUserProps(users);
      res.cookie("x-access-token", token).send({ user });
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  },
};

const getUserProps = (user) => {
  return {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    history: user.history,
    role: user.role,
    verified: user.verified,
    cart: user.cart,
  };
};

module.exports = authController;
