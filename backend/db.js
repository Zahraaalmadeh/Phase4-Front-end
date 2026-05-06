/* global process */
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || process.env.MONGODB_URL);
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("DB connection failed:", err.message);
    return false;
  }
};