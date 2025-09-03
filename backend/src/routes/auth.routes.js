const express = require("express");
const {
  loginController,
  registerController,
  meController,
  logoutController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authMiddleware, meController);
router.post("/logout", logoutController);

module.exports = router;
