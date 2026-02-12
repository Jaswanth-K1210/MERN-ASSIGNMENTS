import exp from 'express'
import { ProductModel } from '../models/product-model.js';
import {hash} from 'Bcryptjs';
import  jwt from 'jsonwebtoken';
import {compare} from 'Bcryptjs';
import { verifytoken } from '../middleware/verifytoken.js';


const productApp = exp.Router()
productApp.use(exp.json());
// read all products
productApp.get('/products', async(req,res)=>{
    let products = await ProductModel.find()
    res.status(200).json({message:"products", payload:products});
})
// create product 
productApp.post('/products', async(req,res)=>{
    let newProduct = req.body;
    let productDetails = new ProductModel(newProduct);
    await productDetails.save();
    console.log("productDetails", productDetails);
    res.status(201).json({message:"Product created"});
})
export default productApp;
