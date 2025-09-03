const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

async function registerController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcryptjs.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on Render
    sameSite: "None", // required for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on Render
    sameSite: "None", // required for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      username: user.username,
      id: user._id,
    },
  });
}

async function meController(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ user: { id: req.user._id, username: req.user.username } });
}

// Logout
async function logoutController(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 0,
  });
  res.json({ message: "Logged out successfully" });
}

module.exports = {
  registerController,
  loginController,
  meController,
  logoutController,
};
