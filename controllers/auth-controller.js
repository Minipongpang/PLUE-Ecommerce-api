const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/database");
const customError = require("../utils/customError");

const register = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber, address } =
    req.body;

  try {
    if (
      !(email && password && firstName && lastName && phoneNumber && address)
    ) {
      return next(customError("Fill All Input", 400));
    }

    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (userExist) {
      throw customError("Email already exist", 400);
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
    };
    console.log(data);

    const result = await prisma.user.create({
      data: data,
    });

    res.json({ message: "register successful" });
  } catch (err) {
    console.log(err);
  }
};

//Login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      throw customError("Fill All Input", 400);
    }

    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (!userExist) {
      throw customError("Invalid Login", 400);
    }

    //check password

    const passwordCheck = await bcrypt.compare(password, userExist.password);
    if (!passwordCheck) {
      throw customError("Invalid Login", 400);
    }

    //token
    const payload = {
      id: userExist.id,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      address: userExist.address,
      phoneNumber: userExist.phoneNumber,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};

// Update Profile
const updateProfile = async (req, res, next) => {
  const { email, firstName, lastName, phoneNumber, address } = req.body;

  try {
    // Find the current authenticated user based on the token
    const currentUserEmail = req.user.email;
    const user = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });

    if (!user) {
      throw customError("User not found", 404);
    }

    // Update user data
    const updatedUserData = {
      email: email || user.email, // Update email if provided, otherwise keep current
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      phoneNumber: phoneNumber || user.phoneNumber,
      address: address || user.address,
    };

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: currentUserEmail },
      data: updatedUserData,
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};
module.exports = { register, login, me, updateProfile };
