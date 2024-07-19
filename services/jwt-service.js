const jwt = require("jsonwebtoken");

const jwtService = {};

jwtService.sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

jwtService.verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      throw new Error(err);
    }
    throw err;
  }
};

module.exports = jwtService;
