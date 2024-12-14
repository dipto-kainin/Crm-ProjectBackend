import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
import expressAsyncHandler from "express-async-handler";

export const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});


export const isAuthorized = (...roles) => expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        if (!roles.includes(user.role || ""))
            throw new Error("You're not allowed to access this resource");
        next();
    } catch (error) {
        console.log('[AUTHORIZATION_ERROR]', error);
        return res.status(400).json({
            sucess: false,
            message: `Unauthorized: ${error.message}`
        });
    }
})