const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.patch("/updateProfile", authenticate, authController.updateProfile);
router.get("/me", authenticate, authController.me);

module.exports = router;
