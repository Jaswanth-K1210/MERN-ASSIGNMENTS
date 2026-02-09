import express from "express";
import { UserModel } from "../models/user.js";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
import { authenticate } from "../services/auth-service.js";

export const adminApp = express.Router();

//authenticate admin
adminApp.post("/admins/login", async (req, res) => {
  let { email, password } = req.body;
  let token = await authenticate({ email, password, role: "ADMIN" });
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
adminApp.put(
  "/users/:userId",
  verifyToken,
  checkRole("ADMIN"),
  async (req, res) => {
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
