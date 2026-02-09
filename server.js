import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./routes/users.js";
import { authorApp } from "./routes/authors.js";
import { adminApp } from "./routes/admins.js";
import cookieParser from "cookie-parser";
config();

const app = express();

//add body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

//funciton declaration vs function expression

const connectToDB = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDB();

function errorHandler(err, req, res, next) {
  res.status(500).json({ message: "error", error: err.message });
}
app.use(errorHandler);
