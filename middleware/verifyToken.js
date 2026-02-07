import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { UserModel } from "../models/user.js";
import { compare } from "bcryptjs";

dotenv.config();

export function verifyToken(req,res,next){
    let token= req.cookies["auth-token"];
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
    }
    let decodedToken= jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user= decodedToken;
    console.log("Decoded Token:", decodedToken);
    next();
}


export function checkRole(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
}

export async function login(req,res,next){
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    let isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Login successful", token: token });
};