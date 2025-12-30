const express = require("express");
const { getProductsStatic, getProducts } = require("../controllers/products");

const router = express.Router();

router.route("/").get(getProducts);
router.route("/static").get(getProductsStatic);

module.exports = router;
