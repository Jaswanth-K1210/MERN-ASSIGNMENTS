import exp from "express";
import { Schema, model } from "mongoose";


//  User schema --> { name, email,date of birth ,mobile number}
const userSchema = {
    uid: { type: Number, required: true, unique: true },
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    mobileNumber: { type: String, required: true }
};
export const UserModel = model("User", userSchema);