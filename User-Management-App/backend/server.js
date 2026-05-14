import express from 'express';
import {connect} from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import UserApp from './Routes/User-api.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

//forward req to UserAPI if path starts with /user-api
app.use('/user-api', UserApp);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`),
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

// add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});