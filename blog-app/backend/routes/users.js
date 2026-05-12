import exp from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { ArticleModel } from "../models/article.js";

export const userApp = exp.Router();

// list all articles
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  // read all articles of authors that are active and populate author details in article response
  let articles = await ArticleModel.find({ isArticleActive: true }).populate(
    "author",
    "firstName email",
  );
  res.status(200).json({ message: "all articles", payload: articles });
});

// add article comment
userApp.put(
  "/comment/articleid/:articleId",
  verifyToken("USER"),
  async (req, res) => {
    let { articleId } = req.params;
    let { comment } = req.body;
    // verify user matches token
    let article = await ArticleModel.findOne({ _id: articleId, isArticleActive: true });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    // append comment entry with user id from token
    let commentObj = { user: req.user.id, comment: comment };
    // add user id along with comment to article comments array
    let updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $push: { comments: commentObj } },
      { new: true, runValidators: true },
    ).populate("comments.user", "firstName email");
    res.status(200).json({ message: "Comment added successfully", payload: updatedArticle });
  },
);
