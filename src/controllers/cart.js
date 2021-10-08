const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  res.status(201).json({ message: "Cart" });
};
