const express = require("express");
const adminController = require("../controllers/admin-controller");
const adminRoute = express.Router();

adminRoute.get("/allHistory", adminController.getAllOrderHistory);

module.exports = adminRoute;
