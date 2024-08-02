const express = require("express");
const validateJwtToken = require("../middlewares/validateJwtToken");

const router = express.Router();

const productRouter = require("./product");
const authRouter = require("./auth")
const cartRouter = require("./carts")

router.use("/product",  productRouter);
router.use("/auth", authRouter)
router.use("/carts", cartRouter)

module.exports = router;