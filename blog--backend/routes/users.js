import exp from "express";
import {register, authenticate} from "../services/auth-service.js";
import {checkRole, verifyToken} from "../middleware/verifyToken.js";
import {ArticleModel} from "../models/article.js";

export const userApp = exp.Router();

// user registration route
userApp.post("/register/users", async (req,res) =>{
  let newUser = req.body;
  newUser.role = "USER";
  const newUserObj = await register(newUser);
  res.status(201).json({message:"User Created",payload: newUserObj});
})

// user login route
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
  res.status(200).json({ message: "Login Successful" });
});


// list all articles
userApp.get("/articles", verifyToken, async (req, res) => {
  let articles = await ArticleModel.find().populate(
    "author",
    "firstName email",
  );
  res.status(200).json({ articles: articles });
});


// add article comment
userApp.put('/comment/articleid/:articleId', verifyToken, checkRole("USER"), async (req,res) => {
  let {articleId} = req.params;
  let{comment} = req.body;
  let article = await ArticleModel.findById(articleId);
  if(!article)
  {
    res.status(404).json({message:"Article not found"});
  }
  // append comment entry
  await ArticleModel.findByIdAndUpdate(articleId, {$push: {comments: comment}}, {new:true}).populate("comments.user");
  res.status(200).json({message:"Comment added successfully"});
});