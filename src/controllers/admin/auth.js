const User = require("../../models/user");
const jwt = require("jsonwebtoken");
exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Admin already exits",
      });
    }
    const { _id, firstName, lastName, email, password } = req.body;
    const _user = new User({
      _id,
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role: "admin",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
