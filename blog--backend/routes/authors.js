import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
import { authenticate, register } from "../services/auth-service.js";

export const authorApp = express.Router();

// author registration route
authorApp.post("/register/authors", async (req, res) => {
  let newUser = req.body;
  newUser.role = "AUTHOR";
  const newUserObj = await register(newUser);
  res
    .status(201)
    .json({ message: "User Created Successfully", user: newUserObj });
});

// create article route
authorApp.post(
  "/articles",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    // read article payload
    let newArticle = req.body;
    // bind author id
    newArticle.author = req.user.id;
    // persist article record
    newArticle = new ArticleModel(newArticle);
    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article Created Successfully", Payload: newArticle });
  },
);

// list author articles
authorApp.get(
  "/articles/:authorId",
  verifyToken,
  checkRole("AUTHOR"),
  async (req, res) => {
    let { authorId } = req.params;
    // author article lookup
    let articles = await ArticleModel.find({ author: authorId });
    res.status(200).json({ articles: articles });
  },
);

// update article route
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
    if (!newArticle) {
      return res
        .status(404)
        .json({
          message:
            "Article is not found or you are not authorized to update it",
        });
    }
    res
      .status(201)
      .json({ message: "Article updated Successfully", Payload: newArticle });
  },
);

// soft delete article
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
      return res
        .status(404)
        .json({
          message:
            "Article is not found or you are not authorized to delete it",
        });
    }
    res
      .status(200)
      .json({ message: "Article Deleted Successfully", Payload: article });
  },
);
