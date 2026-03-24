import mongoose from "mongoose";

export const connectDB = async () => {
    try {
    await mongoose.connect('mongodb+srv://shahilparwez725:Kaheshahil@cluster0.krrtxy7.mongodb.net/PlastiPro');
    console.log('DB CONNECTED');
  } catch (error) {
    console.error('DB ERROR:', error);
    process.exit(1); // stop server if DB fails
  }
}