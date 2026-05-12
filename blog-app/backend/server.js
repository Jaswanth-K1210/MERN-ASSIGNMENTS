import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./routes/users.js";
import { authorApp } from "./routes/authors.js";
import { adminApp } from "./routes/admins.js";
import cookieParser from "cookie-parser";
import { commonRouter } from "./routes/common.js";
config();
import cors from "cors";

const app = express();
// use CORS middleware to allow requests from frontend with credentials
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);
// body parsing middleware
app.use(express.json());
app.use(cookieParser());
// api route mounts
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/common-api", commonRouter);

// connect and start
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`),
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

// 404 fallback handler (must be after all routes)
app.use((req, res, next) => {
  res.status(404).json({ message: `${req.url} is invalid path` });
});


app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // handle custom errors
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});
