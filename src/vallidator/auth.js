const { check, validationResult } = require("express-validator");
exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("First Name required"),
  check("lastName").notEmpty().withMessage("Last Name required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
