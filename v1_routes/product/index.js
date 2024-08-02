const express = require("express");
const router = express.Router();
const controller = require("../../controllers/product")

router.get("/products-list", controller.getProducts)
router.get("/product-by-id", controller.getProductById)

module.exports = router;