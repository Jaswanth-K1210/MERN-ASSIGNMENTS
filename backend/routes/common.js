import exp from "express";
import { UserModel } from "../models/user.js";
import { authenticate, register } from "../services/auth-service.js";
import { compare, hash } from "bcryptjs";
import { verifyToken } from "../middleware/verifyToken.js";

export const commonRouter = exp.Router();
// common auth routes

// user login route
commonRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authenticate({ email, password });
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
    res.status(200).json({ message: "Login Successful", payload: user });
  } catch (err) {
    next(err);
  }
});

// register route for all user types
commonRouter.post("/register", async (req, res, next) => {
  let newUser = req.body;
  try {
    const newUserObj = await register(newUser);
    res.status(201).json({ message: "User Created", payload: newUserObj });
  } catch (err) {
    next(err);
  }
});

// change password route
commonRouter.put("/change-password", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res, next) => {
  try {
    // read password payload
    const { email, currentPassword, newPassword } = req.body;
    // check if new password is same as current
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password cannot be the same as current password" });
    }
    // lookup user email
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // verify current password
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    // persist new password
    let hashedPassword = await hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
});

// check auth route - session persistence on page refresh
commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  res.status(200).json({ message: "Authenticated", payload: req.user });
});

// user logout route
commonRouter.post("/logout", (req, res) => {
  // clear auth cookie
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout successful" });
});
