import mongoose from "mongoose";
import dotenv from "dotenv";


const dbConnection = async () => {
  try {
    const dbConnection = await mongoose.connect("mongodb://127.0.0.1:27017/job");
    console.log("Connected to the DB");
  } catch (error) {
    console.log("DB Error: " + error.message);
  }
};

export default dbConnection;
