//database connection settings using mongoose
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR : ${error.message}`);
        process.exit;
    }
};