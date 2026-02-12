import { Schema, model  } from "mongoose";
// create product schema

const productSchema = new Schema(
{
    pid:{type:Number,
        required:[true,"Product ID is required"],
        unique:true},
    productname:{type:String, 
        required:[true,"Product Name is required"],
        minlength:[3,"Product Name must be at least 3 characters"],
        maxlength:[50,"Product Name must be at most 50 characters"]},
    price:{type:Number,
        required:[true,"Price is required"]},
    brandname:{type:String, 
        required:[true,"Brand Name is required"],
        minlength:[2,"Brand Name must be at least 2 characters"],
        maxlength:[30,"Brand Name must be at most 30 characters"]}
},{ strict:"throw" , timestamps:true
});

// create product model with that schema
export const ProductModel = model("product", productSchema)