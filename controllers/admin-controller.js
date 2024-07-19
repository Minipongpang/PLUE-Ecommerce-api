const prisma = require("../models/prisma");
const uploadService = require("../services/upload-service");
const customError = require("../utils/customError");

const adminController = {};

adminController.getUserOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderHistory = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true, //เจาะเกราะดึงสามตาราง
          },
        },
        user: true,
      },
    });
    res.status(200).json(orderHistory);
  } catch (err) {
    console.log(err);
  }
};

adminController.getAllOrderHistory = async (req, res, next) => {
  try {
    const allOrderHistory = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true, // ดึงข้อมูลจากตาราง product
          },
        },
        user: true, // ดึงข้อมูลจากตาราง user
      },
    });
    res.status(200).json(allOrderHistory);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = adminController;
