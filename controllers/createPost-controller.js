const prisma = require("../models/prisma");
const uploadService = require("../services/upload-service");
const customError = require("../utils/customError");

const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw customError({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    const { productName, gender, productType, price, description } = req.body;

    // ตรวจสอบ input
    if (!productName || !gender || !productType || !price || !description) {
      throw customError({
        message: "Please fill all inputs",
        statusCode: 400,
      });
    }

    if (!req.files || req.files.length === 0) {
      throw customError({
        message: "Please upload at least one image",
        statusCode: 400,
      });
    }

    // อัพโหลดภาพทั้งหมดไป Cloudinary
    const imageUpload = req.files.map((file) =>
      uploadService.upload(file.path)
    );
    const imageUrls = await Promise.all(imageUpload);

    const genders = ["MEN", "WOMEN", "KIDS"];

    const normalizeGender = (gender) => {
      const validGenders = ["MEN", "WOMEN", "KIDS"];
      if (!validGenders.includes(gender)) {
        throw new Error("Invalid gender value");
      }
      return gender;
    };

    const normalizeProductType = (productType) => {
      const validateProductType = ["SHIRTS", "PANTS", "JACKETS", "ACCESSORIES"];
      if (!validateProductType.includes(productType)) {
        throw new Error("Invalid productType value");
      }
      return productType;
    };

    // เตรียมข้อมูลบันทึกลง database
    const data = {
      productName,
      gender: normalizeGender(req.body.gender),
      productType: normalizeProductType(req.body.productType),
      price: parseFloat(price), // แปลงเป็นตัวเลขทศนิยม
      description,
      productImage1: imageUrls[0] || null,
      productImage2: imageUrls[1] || null,
      productImage3: imageUrls[2] || null,
      productImage4: imageUrls[3] || null,
      productImage5: imageUrls[4] || null,
      productImage6: imageUrls[5] || null,
    };

    // บันทึกข้อมูลลง database
    const newPost = await prisma.product.create({
      data,
    });

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

module.exports = postController;
