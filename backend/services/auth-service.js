import { UserModel } from "../models/user.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

// register new user
export const register = async (userObj) => {
  const userDoc = new UserModel(userObj);
  await userDoc.validate();
  userDoc.password = await hash(userDoc.password, 10);
  const created = await userDoc.save();
  const newUserObj = created.toObject();
  delete newUserObj.password;
  return newUserObj;
};

// authenticate user credentials
export const authenticate = async ({ email, password }) => {
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    const err = new Error("Invalid email");
    err.status = 401;
    throw err;
  }
  // check if user account is blocked
  if (user.isActive === false) {
    const err = new Error("Your account is blocked, please contact admin");
    err.status = 403;
    throw err;
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    err.status = 401;
    throw err;
  }
  let token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
  );
  const newUserObj = user.toObject();
  delete newUserObj.password;

  return { token, user: newUserObj };
};

export const updatePassword = async ({ email, currentPassword, newPassword }) => {
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  // check if new password is same as current
  if (currentPassword === newPassword) {
    const err = new Error("New password cannot be the same as current password");
    err.status = 400;
    throw err;
  }
  const isMatch = await compare(currentPassword, user.password);
  if (!isMatch) {
    const err = new Error("Current password is incorrect");
    err.status = 401;
    throw err;
  }
  let hashedPassword = await hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  return { message: "Password changed successfully" };
};

export const getUserById = async (id) => {
  const user = await UserModel.findById(id).select("-password");
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return user;
};
