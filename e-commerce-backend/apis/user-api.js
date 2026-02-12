import exp from "express";
import { userModel } from "../models/user-model.js";
import { hash } from "Bcryptjs";
import jwt from "jsonwebtoken";
import { compare } from "Bcryptjs";
import cookieParser from "cookie-parser";
import { ProductModel } from "../models/product-model.js";

const userApp = exp.Router();
//
userApp.use(exp.json());
// add cookie parser middleware
userApp.use(cookieParser());

// user api routes

// create user
userApp.post("/user", async (req, res) => {
  let newUser = req.body;
  // generate a unique user ID (uid) automatically
  const lastUser = await userModel.findOne().sort({ uid: -1 });
  newUser.uid = lastUser ? lastUser.uid + 1 : 1;
  console.log("New User with UID:", newUser.uid,lastUser);
  // run teh validator to avoid password trap
  await userModel.validate(newUser);
  // hash the password before saving
  let hashedPassword = await hash(newUser.password, 7);
  //replace the plain password with hashed password
  newUser.password = hashedPassword;
  //create and save the document,
  let UserDetails = new userModel(newUser);
  // before saving also run the validator to avoid password trap , we can use a pre save hook also validateBeforeSave
  await UserDetails.save({ validateBeforeSave: false });
  console.log("UserDetails", UserDetails);
  res.status(201).json({ message: "User created" });
});

// read user
userApp.get("/user", async (req, res) => {
  // read users from database
  let users = await userModel.find();
  res.status(200).json({ message: "users", payload: users });
});

// authenticate user
userApp.post("/login", async (req, res) => {
  let credentials = req.body;
  // find user by username
  let user = await UserModel.findOne({ username: credentials.username });
  if (!user) {
    return res.status(401).json({ message: "Invalid username" });
  }
  // compare password
  let result = await compare(credentials.password, user.password);
  if (!result) {
    return res.status(401).json({ message: "Invalid password" });
  }
  // generate jwt token
  let token = jwt.sign({ username: user.username }, "secretkey", {
    expiresIn: "1h",
  });
  // set token in http-only cookie
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Login successful" });
});

// update product to user cart
userApp.put("/user/user-id/:userid/product-id/:productid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const productPid = req.params.productid; // This is the simple ID, e.g., '101'

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product document using its simple 'pid'
    const product = await ProductModel.findOne({ pid: productPid });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use the product's actual MongoDB _id for all cart operations
    const productObjectId = product._id;

    const existingCartItem = user.cart.find(
      (item) =>
        item.product && item.product.toString() === productObjectId.toString(),
    );

    let modifiedUser;
    if (existingCartItem) {
      // If product exists, increment its quantity
      modifiedUser = await userModel
        .findOneAndUpdate(
          { _id: userId, "cart.product": productObjectId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true },
        )
        .populate("cart.product");
    } else {
      // If product doesn't exist, add it to the cart using its ObjectId
      modifiedUser = await userModel
        .findByIdAndUpdate(
          userId,
          { $push: { cart: { product: productObjectId, quantity: 1 } } },
          { new: true },
        )
        .populate("cart.product");
    }

    res
      .status(200)
      .json({ message: "Cart updated successfully", payload: modifiedUser });
  } catch (err) {
    console.error("Cart update error:", err);
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

// how can we create a product id and increase it automatically? explain
// first create a counter schema and model to keep track of the product id
// then use pre save hook to increment the product id before saving the product
// read user by id
userApp.get("/user/:uid", async (req, res) => {
  let userId = req.params.uid;
  let userDetails = await userModel.findById(userId).populate("cart.product");
  return res
    .status(200)
    .json({ message: "User details", payload: userDetails });
});
export default userApp;
