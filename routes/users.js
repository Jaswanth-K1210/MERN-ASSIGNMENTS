import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { register, authenticate } from "../services/auth-service.js";

export const userApp = express.Router();

//create user
userApp.post("/register/users", async (req, res) => {
  let newUser = req.body;
  newUser.role = "USER";
  const newUserObj = await register(newUser);
  res.status(201).json({ message: "User Created Successfully" , user: newUserObj});
});


//authenticate user
userApp.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const token = await authenticate({ email, password, role: "USER" });
  if (!token) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Login Successful", token: token });
});

//read all articles
userApp.get("/articles", verifyToken, async (req, res) => {
  let articles = await ArticleModel.find();
  res.status(200).json({ articles: articles });
});

//add comment to an article
userApp.put("/comment/articleid/:articleId", verifyToken, async (req, res) => {
  let { articleId } = req.params;
  let { comment } = req.body;
  console.log("user ID from Token:", req.user.id);
  console.log("Article ID:", articleId);
  console.log("Comment Data:", comment);
  let article = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $push: { comments: { user: req.user.id, comment: comment } },
    },
    { new: true },
  ).populate("comments.user");
  res
    .status(200)
    .json({ message: "Comment added successfully", article: article });
});
