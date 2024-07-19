const prisma = require("../models/prisma");
const uploadService = require("../services/upload-service");
const customError = require("../utils/customError");

const orderController = {};

orderController.checkout = async (req, res, next) => {
  const {
    userId,
    status,
    paymentStatus,
    orderItems: orderItemsString,
  } = req.body;

  try {
    const orderItems = JSON.parse(orderItemsString);
    let eSlipUrl = null;

    if (req.file) {
      eSlipUrl = await uploadService.upload(req.file.path);
    }

    const newOrder = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        status,
        paymentStatus,
        eSlip: eSlipUrl,
        orderItems: {
          create: orderItems.map((item) => ({
            productId: parseInt(item.productId),
            amount: parseInt(item.amount),
            price: parseFloat(item.price),
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

orderController.getUserOrderHistory = async (req, res, next) => {
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

orderController.getAllOrderHistory = async (req, res, next) => {
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

module.exports = orderController;
