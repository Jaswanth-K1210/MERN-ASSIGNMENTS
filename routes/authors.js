import express from 'express';
import { ArticleModel } from '../models/article.js';
import {verifyToken, checkRole} from '../middleware/verifyToken.js';
import { UserModel } from '../models/user.js';
import { hash } from 'bcryptjs';
import { login } from '../middleware/verifyToken.js';


export const authorApp = express.Router();

//register author
authorApp.post("/register/authors", async (req, res) => {
  let newUser = req.body;
  let role = newUser.role.toUpperCase();
  if(role!== "AUTHOR")
    return res.status(401).json({message:"The user should be an author"});
  newUser.role = role;
  await new UserModel(newUser).validate();
  let hashedPassword = await hash(newUser.password, 10);
  newUser.password = hashedPassword;
  newUser = new UserModel(newUser);
  await newUser.save({ validateBeforeSave: false });
  res.status(201).json({ message: "User Created Successfully" });
});
//authenticate author
authorApp.post("/authors/login", async (req, res) => {
    await login(req,res);
});

//create article
authorApp.post("/articles",verifyToken, checkRole("AUTHOR"), async (req, res) => {
    let newArticle =req.body;
    newArticle.author= req.user.id;
    console.log("Author ID from Token:", req.user.id);
    console.log("New Article Data:", newArticle);
    newArticle = new ArticleModel(newArticle);
    await newArticle.save();
    res.status(201).json({message:"Article Created Successfully", Payload: newArticle});
});

//read aticles of author
authorApp.get("/articles",verifyToken, checkRole("AUTHOR"), async (req, res) => {
    let articles= await ArticleModel.find({author:req.user.id});
    res.status(200).json({articles: articles});
});

//edit article
authorApp.put("/articles/:articleId",verifyToken, checkRole("AUTHOR"), async (req, res) => {
    let {articleId} = req.params;
    let newArticle =req.body;
    newArticle = await ArticleModel.findOneAndUpdate(
        {author:req.user.id, _id: articleId},
        {$set: newArticle},{new:true});
    res.status(201).json({message:"Article Created Successfully", Payload: newArticle});
});


//delete article(soft delete)
delete authorApp.delete("/articles/:articleId",verifyToken, checkRole("AUTHOR"), async (req, res) => {
    let {articleId} = req.params;
    let article = await ArticleModel.findOneAndUpdate(
        {author:req.user.id, _id: articleId},
        {$set: {isActive: false}},{new:true});
    if(!article){
        return res.status(404).json({message:"Article Not Found"});
    }
    res.status(200).json({message:"Article Deleted Successfully", Payload: article});
});