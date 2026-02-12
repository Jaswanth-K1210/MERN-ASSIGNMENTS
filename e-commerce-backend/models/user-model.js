import { Schema, model } from "mongoose";
// create cart schema
//const cartSchema = new Schema(
 // create user schema
  //{ product:{
   //   type: Schema.Types.ObjectId,
     // ref: "product", // name of product model
  //}});

const cartSchema = new Schema(
    {
        product:{
            type: Schema.Types.ObjectId,
            ref: "product", // name of product model
        },
        quantity:{  
            type:Number,
            default:1,
            min:[1,"Quantity cannot be less than 1"]
        }
    });
 
const userSchema = new Schema(
  {
    uid: {
      type: Number,
      required: [true, "User ID is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name must be at most 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [100, "Password must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
    },
    cart: [cartSchema]
  },
  { strict: "throw", timestamps: true },
);
//  create user model
export const userModel = model("user", userSchema);
