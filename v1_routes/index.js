const express = require("express");
const validateJwtToken = require("../middlewares/validateJwtToken");

const router = express.Router();

const productRouter = require("./product");

router.use('/product',  productRouter);

module.exports = router;