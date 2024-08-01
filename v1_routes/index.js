const express = require("express");
const validateJwtToken = require("../middlewares/validateJwtToken");

const router = express.Router();

const productRouter = require("./product");
const authRouter = require("./auth")

router.use('/product',  productRouter);
router.use('/auth', authRouter)

module.exports = router;