import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
import { authenticate, register } from "../services/auth-service.js";

export const authorApp = express.Router();

//register author
authorApp.post("/register/authors", async (req, res) => {
  let newUser = req.body;
  newUser.role = "AUTHOR";
  const newUserObj = await register(newUser);
  res
    .status(201)
    .json({ message: "User Created Successfully", user: newUserObj });
});

//authenticate author
authorApp.post("/authors/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await authenticate({ email, password, role: "AUTHOR" });
  if (!token) return res.status(401).json({ message: "Invalid credentials" });
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Login Successful", token: token });
});

//create article
authorApp.post(
  "/articles",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let newArticle = req.body;
    newArticle.author = req.user.id;
    newArticle = new ArticleModel(newArticle);
    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article Created Successfully", Payload: newArticle });
  },
);

//what is git branch command? 
//command? git branch is a command used in Git to manage branches in a repository. It allows you to create, list, rename, and delete branches. Branches are used to develop features, fix bugs, or experiment with new ideas without affecting the main codebase.
//syntax to create a new branch: git branch <branch-name>
//syntax to list all branches: git branch
//syntax to switch to a branch: git checkout <branch-name>
//syntax to delete a branch: git branch -d <branch-name>
//syntax to check current branch: git branch --show-current

//read aticles of author
authorApp.get(
  "/articles",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let articles = await ArticleModel.find({ author: req.user.id });
    res.status(200).json({ articles: articles });
  },
);

//edit article
authorApp.put(
  "/articles/:articleId",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let newArticle = req.body;
    newArticle = await ArticleModel.findOneAndUpdate(
      { author: req.user.id, _id: articleId },
      { $set: newArticle },
      { new: true },
    );
    res
      .status(201)
      .json({ message: "Article Created Successfully", Payload: newArticle });
  },
);

//delete article(soft delete)
delete authorApp.delete(
  "/articles/:articleId",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let article = await ArticleModel.findOneAndUpdate(
      { author: req.user.id, _id: articleId },
      { $set: { isActive: false } },
      { new: true },
    );
    if (!article) {
      return res.status(404).json({ message: "Article Not Found" });
    }
    res
      .status(200)
      .json({ message: "Article Deleted Successfully", Payload: article });
  },
);
