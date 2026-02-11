import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./routes/users.js";
import { authorApp } from "./routes/authors.js";
import { adminApp } from "./routes/admins.js";
import cookieParser from "cookie-parser";
import { UserModel } from "./models/user.js";
import { commonRouter } from "./routes/common.js";
config();

const app = express();

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

// 404 fallback handler
app.use((req, res, next) => {
  console.log(req.url)
  res.status(404).json({ message: "Route not found" });
});
// test users route
app.get("/get-users", async (req, res) => {
  let users = await UserModel.find();
  res.status(200).json({ message: "get users", payload: users });
});

// global error handler
function errorHandler(err, req, res, next) {
  res.status(500).json({ message: "error", error: err.message });
}
app.use(errorHandler);
