import express from "express";
import { UserModel } from "../models/user.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";

export const adminApp = express.Router();

//authenticate admin
adminApp.post("/admins/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  let isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  console.log("User Role:", user.role);
  let token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
  );
  console.log("Generated Token:", token);
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Login successful", token: token });
});

//read all articles
adminApp.get("/articles", verifyToken, async (req, res) => {
  let articles = await ArticleModel.find();
  res.status(200).json({ articles: articles });
});

//block/unblock user roles
adminApp.put("/users/:userId",verifyToken,checkRole("ADMIN"), async (req, res) => {
    let { userId } = req.params;
    let { isActive } = req.body;
    let user = await UserModel.findByIdAndUpdate(
      userId,
      { isActive: isActive },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User status updated successfully", user: user });
  },
);
