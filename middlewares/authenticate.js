const prisma = require("../models/database");
const customError = require("../utils/customError");
const jwtService = require("../services/jwt-service");

module.exports = async (req, res, next) => {
  try {
    // check req.headers ว่ามี authorization keyไหม
    const authorization = req.headers.authorization;
    console.log("authorization", req.headers);
    if (!authorization || !authorization.startsWith("Bearer ")) {
      customError({
        message: "unauthenticated",
        statusCode: 401,
      });
    }

    // check token
    const accessToken = authorization.split(" ")[1];

    const payload = jwtService.verify(accessToken);
    // use payload to find user in prisma
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      customError({
        message: "user was not found",
        statusCode: 400,
      });
    }
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
