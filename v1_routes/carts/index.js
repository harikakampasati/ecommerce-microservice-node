const express = require("express");
const router = express.Router();
const controller = require("../../controllers/carts");
const validateJwtToken = require("../../middlewares/validateJwtToken")

router.post("/add-to-cart", validateJwtToken.validateToken, controller.addToCart);
router.post("/update-cart", validateJwtToken.validateToken, controller.updateCart);
router.delete("/delete-cart", validateJwtToken.validateToken, controller.deleteCart);

module.exports = router;