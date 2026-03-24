import mongoose from "mongoose";

export const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB CONNECTED');
  } catch (error) {
    console.error('DB ERROR:', error);
    process.exit(1); // stop server if DB fails
  }
}