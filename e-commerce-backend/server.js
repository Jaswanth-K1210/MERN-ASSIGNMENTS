import exp from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userapi from './Apis/user-api.js';
import productapi from './Apis/product-api.js';

const app = exp()
const port = 3000;

// middleware to parse json body
app.use(exp.json());
// middleware to parse cookies
app.use(cookieParser());

// routes
app.use('/user-api', userapi);
app.use('/product-api', productapi);

// connect to MongoDB and start server
async function connectDB()
{
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-ecomDB');
        console.log("Connected to MongoDB");

        app.listen(port,() => {
            console.log(`Server started on port ${port}`);
        });
    } catch (err) {
        console.log("Error connecting to MongoDB", err);
    }
}

connectDB();

app.use('/user-api', userapi);
app.use('/product-api', productapi);

function errorHandler(err, req, res, next){
    res.status(500).json({message:"Error occurred", error:err.message});
    next
};

app.use(errorHandler);