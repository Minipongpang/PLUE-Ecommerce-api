const express = require("express");
const orderController = require("../controllers/order-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const orderRoute = express.Router();

orderRoute.post("/checkout", upload.single("eSlip"), orderController.checkout);

orderRoute.get(
  "/orderHistory",
  authenticate,
  orderController.getUserOrderHistory
);
orderRoute.get("/all", orderController.getAllOrderHistory);

module.exports = orderRoute;
