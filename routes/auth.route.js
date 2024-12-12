import express from 'express';
import { registerUser, verifyUser } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/verify', verifyUser);

export default authRouter;