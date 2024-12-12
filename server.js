import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import authRouter from './routes/auth.route.js';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));
