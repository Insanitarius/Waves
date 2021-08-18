const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller')



///  /api/auth/...
router.get('/register',authController.register)
router.get('/signin',authController.signin)
router.get('/isauth',authController.isauth)



module.exports = router;