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
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    err.status = 401;
    throw err;
  }
  let token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
  );
  return token;
};
