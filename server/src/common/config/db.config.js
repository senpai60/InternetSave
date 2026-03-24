import mongoose from "mongoose";
import ENV_CONFIG from "./env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV_CONFIG.MONGODB_URI);
    console.log("🥬🥬MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
