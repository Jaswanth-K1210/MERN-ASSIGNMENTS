import express from "express";
import { ArticleModel } from "../models/article.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { register } from "../services/auth-service.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const authorApp = express.Router();

// author registration route with image upload
authorApp.post("/register/authors", upload.single("profileImage"), async (req, res, next) => {
  try {
    let newUser = req.body;
    newUser.role = "AUTHOR";
    // upload profile image to cloudinary if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      newUser.profileImageUrl = result.secure_url;
    }
    const newUserObj = await register(newUser);
    res
      .status(201)
      .json({ message: "User Created Successfully", payload: newUserObj });
  } catch (err) {
    next(err);
  }
});

// create article route
authorApp.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  // read article payload
  let newArticle = req.body;
  // bind author id
  newArticle.author = req.user.id;
  // persist article record
  newArticle = new ArticleModel(newArticle);
  await newArticle.save();
  res
    .status(201)
    .json({ message: "Article Created Successfully", payload: newArticle });
});

// list author articles
authorApp.get(
  "/articles/:authorId",
  verifyToken("AUTHOR"),
  async (req, res) => {
    let { authorId } = req.params;
    // author article lookup
    let articles = await ArticleModel.find({ author: authorId }).populate(
      "author",
      "firstName email",
    );
    res.status(200).json({ message: "author articles", payload: articles });
  },
);

// update article route
authorApp.put(
  "/articles/:articleId",
  verifyToken("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let { title, category, content } = req.body;
    let updatedArticle = await ArticleModel.findOneAndUpdate(
      { author: req.user.id, _id: articleId },
      { $set: { title, category, content } },
      { new: true },
    );
    if (!updatedArticle) {
      return res.status(404).json({
        message: "Article is not found or you are not authorized to update it",
      });
    }
    res
      .status(200)
      .json({ message: "Article updated Successfully", payload: updatedArticle });
  },
);

// soft delete / restore article
authorApp.patch(
  "/articles/:articleId",
  verifyToken("AUTHOR"),
  async (req, res) => {
    let { articleId } = req.params;
    let article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }
    // ownership check - only the author who created can delete/restore
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to modify this article",
      });
    }
    // toggle active status
    let newStatus = !article.isArticleActive;
    article.isArticleActive = newStatus;
    await article.save();
    let action = newStatus ? "restored" : "deleted";
    res.status(200).json({
      message: `Article ${action} Successfully`,
      payload: article,
    });
  },
);
