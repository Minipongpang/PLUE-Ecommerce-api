const prisma = require("../models/prisma");

const customError = require("../utils/customError");

const productController = {};

productController.getAllProduct = async (req, res, next) => {
  try {
    const allProductData = await prisma.product.findMany();
    res.status(200).json(allProductData);
  } catch (err) {
    next(err);
  }
};

module.exports = productController;
