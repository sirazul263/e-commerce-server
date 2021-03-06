const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router = express.Router();

const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/category");
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
});
//Routes
router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.post(
  "/category/update",
  upload.array("categoryImage"),
  updateCategories
);
router.post("/category/delete", deleteCategories);

router.get("/category/getcategory", getCategories);
module.exports = router;
