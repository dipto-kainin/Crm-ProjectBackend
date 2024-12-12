const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));
