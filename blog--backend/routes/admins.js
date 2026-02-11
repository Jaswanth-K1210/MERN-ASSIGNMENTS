import express from "express";
import { UserModel } from "../models/user.js";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
import { authenticate } from "../services/auth-service.js";

export const adminApp = express.Router();

// admin routes router

// list all articles
adminApp.get("/articles", verifyToken, checkRole("admin"), async (req, res) => {
  let articles = await ArticleModel.find();
  res.status(200).json({ articles: articles });
});

// toggle user status
adminApp.put(
  "/users/:userId",verifyToken,checkRole("admin"),async (req, res) => {
    let { userId } = req.params;
    let checkActiveStatus = req.body.isActive;
    let user = await UserModel.findByIdAndUpdate(
      userId,
      { isActive: checkActiveStatus },
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
