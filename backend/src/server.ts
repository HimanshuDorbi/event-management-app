import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!, {
//   useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB..');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
  });
}).catch((error) => {
  console.error('Connection error', error);
});
