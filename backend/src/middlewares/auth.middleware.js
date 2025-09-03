const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access, please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found, please login again",
      });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token, please login again",
    });
  }
}

module.exports = authMiddleware;
