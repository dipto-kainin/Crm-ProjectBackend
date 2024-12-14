import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import clientRouter from "./routes/client.route.js";
import taskRouter from "./routes/task.route.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(3000, console.log(`server started on port 3000`));
