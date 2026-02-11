import exp from "express";
import { UserModel } from "../models/user.js";
import { authenticate } from "../services/auth-service.js";
import bcrypt from "bcrypt";

export const commonRouter = exp.Router();
// common auth routes

// user login route
commonRouter.post("/login", async (req, res) => {
  const{ email, password } = req.body;
  let usertype = await UserModel.findOne({ email: email }).select("role");
  console.log("usertype", usertype);
  let activeUser = await UserModel.findOne({email:email}).select("isActive");
  console.log(activeUser)
  if(activeUser.isActive === false)  {
    return res.status(403).json({message:"Your account is blocked, please contact admin"});
  }
   const token = await authenticate({ email, password });
    if (!token) return res.status(401).json({ message: "Invalid credentials" });
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Login Successful" });
});
// change password route
commonRouter.put("/change-password", async (req, res) => {
  // read password payload
  const {email,currentpassword, newpassword} = req.body;
  // lookup user email
  let user = await UserModel.findOne({ email: email });
  console.log(user)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // verify current password
  const isMatch = await bcrypt.compare(currentpassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // persist new password
  let hashedPassword = await bcrypt.hash(newpassword, 7);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password changed successfully" });
} );
// user logout route
commonRouter.post("/logout", (req, res) => {
  // clear auth cookie
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
});
