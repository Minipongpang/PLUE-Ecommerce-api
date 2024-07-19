const express = require("express");
const productController = require("../controllers/product-controller");
const productRouter = express.Router();

productRouter.get("/", productController.getAllProduct);

module.exports = productRouter;
