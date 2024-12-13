import express from "express";
import {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
    verifyUser,
} from "../controller/auth.controller.js";
import { isAuthenticated } from "../middlewere/auth.js";

const authRouter = express.Router();

authRouter.post("/register", isAuthenticated, registerUser);
authRouter.post("/verify", verifyUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", isAuthenticated, getUserProfile);

export default authRouter;
