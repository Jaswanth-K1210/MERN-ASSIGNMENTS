import { Schema, model } from "mongoose";

// user document schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImageUrl: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "AUTHOR", "USER"],
      required: [true, "{value} is an Invalid role"],
    },
    isActive: {
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

// user model export
export const UserModel = model("user", userSchema);
