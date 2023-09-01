import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };
  

app.listen(8080, () =>{
    connect();
    console.log('Server is running on port 8080')
});

