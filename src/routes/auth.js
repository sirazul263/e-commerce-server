const express = require("express");
const { requireSignin } = require("../common-middleware");
const { signup, signin } = require("../controllers/auth");
const router = express.Router();

const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../vallidator/auth");
//Routes
router.post("/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({
    user: "profile",
  });
});
module.exports = router;
