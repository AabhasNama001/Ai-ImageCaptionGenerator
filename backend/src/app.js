const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// CORS setup — allow frontend to talk to backend
app.use(cors({
  origin: "http://localhost:5173", // React dev server URL
  credentials: true,               // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
