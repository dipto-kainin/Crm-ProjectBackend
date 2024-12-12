//database connection settings using mongoose
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR : ${error.message}`);
        process.exit;
    }
};
module.exports = connectDB;
