const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// CORS setup — allow local dev + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local React dev
      "https://regal-mermaid-eb66ab.netlify.app", // deployed frontend
    ],
    credentials: true, // allow cookies / auth headers
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
