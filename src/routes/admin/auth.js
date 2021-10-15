const express = require("express");
const { requireSignin } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controllers/admin/auth");
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../../vallidator/auth");
const router = express.Router();

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/admin/signout", requireSignin, signout);
module.exports = router;
