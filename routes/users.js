import express from "express";
import { UserModel } from "../models/user.js";
import { ArticleModel } from "../models/article.js";
import { verifyToken, login } from "../middleware/verifyToken.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const userApp = express.Router();

//create user
userApp.post("/register/users", async (req, res) => {
  let newUser = req.body;
  let role = newUser.role.toUpperCase();
  newUser.role = role;
  await new UserModel(newUser).validate();
  let hashedPassword = await hash(newUser.password, 10);
  newUser.password = hashedPassword;
  newUser = new UserModel(newUser);
  await newUser.save({ validateBeforeSave: false });
  res.status(201).json({ message: "User Created Successfully" });
});

//authenticate user
userApp.post("/login", async (req, res) => {
  await login(req,res);
});

//read all articles
userApp.get("/articles",verifyToken, async (req, res) => {
  let articles = await ArticleModel.find();
  res.status(200).json({ articles: articles });
});

//add comment to an article
userApp.put("/comment/articleid/:articleId", verifyToken, async (req, res) => {
  let { articleId } = req.params;
  let {comment} = req.body;
  console.log("user ID from Token:", req.user.id);
  console.log("Article ID:", articleId);
  console.log("Comment Data:", comment);
  let article = await ArticleModel.findByIdAndUpdate(articleId, {
    $push: { comments: { user: req.user.id, comment: comment } },
  },{new:true}).populate("comments.user");
  res.status(200).json({ message: "Comment added successfully", article: article });
});
