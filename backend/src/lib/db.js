import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB Connected: ${conn.connection.name}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
        process.exit(1);    //1 means failure code here
    }
}