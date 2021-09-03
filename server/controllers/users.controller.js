const { userService, authService, emailService } = require("../services");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const usersController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const users = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(users);

      await emailService.verificationEmail(users.email, users);
      const user = getUserProps(users);
      res.cookie("x-access-token", token).send({ user });
    } catch (error) {
      next(error);
    }
  },
  async verifyAccount(req, res, next) {
    try {
      const token = await userService.validateToken(req.query.validation);
      const users = await userService.findUserById(token.sub);

      if (!users) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

      if (users.verified)
        throw new ApiError(httpStatus.BAD_REQUEST, "Already verified!");

      users.verified = true;
      users.save();
      const user = getUserProps(users);
      res.status(httpStatus.CREATED).send({ user });
    } catch (error) {
      next(error);
    }
  },
  async revalidateEmail(req, res, next) {
    try {
      const users = await userService.findUserByEmail(req.body.email);
      if (!users) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      if (users.verified)
        throw new ApiError(httpStatus.BAD_REQUEST, "Already verified!");

      await emailService.verificationEmail(users.email, users);
      const user = getUserProps(users);
      res.status(httpStatus.ACCEPTED).send({ user });
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

module.exports = usersController;
