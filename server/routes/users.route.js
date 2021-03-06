const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const auth = require("../middleware/auth");

router
  .route("/profile")
  .get(auth("readOwn", "profile"), usersController.profile)
  .patch(auth("updateOwn", "profile"), usersController.updateProfile);

router.patch(
  "/email",
  auth("updateOwn", "profile"),
  usersController.updateUserEmail
);
router.get("/verify", usersController.verifyAccount);
router.post(
  "/revalidate",
  auth("readOwn", "profile"),
  usersController.revalidateEmail
);

router.post(
  "/addtocart",
  auth("updateOwn", "profile"),
  usersController.addToCart
);

router.post(
  "/removefromcart",
  auth("updateOwn", "profile"),
  usersController.removeFromCart
);

module.exports = router;
