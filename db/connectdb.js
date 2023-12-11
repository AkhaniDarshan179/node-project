import mongoose from "mongoose";

const connectDB = async (DATABASE_URI) => {
  try {
    const DB_OPTION = {
      dbname: "master",
    };
    await mongoose.connect(DATABASE_URI, DB_OPTION);
    console.log("Database Connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
