import { Schema, model } from "mongoose";
// embedded comment schema
const userCommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User id is required"],
  },
  comment: {
    type: String,
  },
});

// article document schema
const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Author id is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    comments: [userCommentSchema],
    isArticleActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  },
);

// article model export
export const ArticleModel = model("article", articleSchema);
