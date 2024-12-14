import { providers } from "../constant/provider.js";
import { testEmail } from "../utils/verifyEmail.js";
import { User } from "../model/User.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { roles } from "../constant/role.js";
import { generateToken, verifyToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { provider, email, phone, password, role, name } = req.body;

        //user can only add user with equal or lower prio
        if (
            (req.user.role === roles.TEAM_MEMBER &&
                (role === roles.MANAGER || role === roles.ADMIN)) ||
            (req.user.role === roles.MANAGER && role === roles.ADMIN)
        ) {
            throw new Error("You are not authorized to add this role");
        }

        if (!password) throw new Error("Invalid password");

        switch (provider) {
            case providers.EMAIL:
                if (!email || !testEmail(email))
                    throw new Error("Invalid email");

                const { activationCode, token } = generateToken({
                    email,
                    name,
                    password,
                    role,
                    phone,
                    provider,
                });
                return res.status(200).json({
                    success: true,
                    verificationToken: token,
                    activationCode,
                    message: `Verification code will be expired in 5 minutes`,
                });
            case providers.PHONE:
                // TODO
                break;
            default:
                throw new Error("Wrong provider");
        }
    } catch (error) {
        console.log("[REGISTER_USER_ERROR]", error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`,
        });
    }
};

export const verifyUser = async (req, res) => {
    try {
        const { verificationToken, activationCode } = req.body;
        const payload = verifyToken(verificationToken, activationCode);
        if (!payload) throw new Error("Token manifested");

        const { email, name, password, role, phone, provider } = payload;
        console.log(payload);

        let user;
        switch (provider) {
            case providers.EMAIL:
                user = await User.create({
                    name,
                    email,
                    password,
                    phone,
                    provider,
                    role,
                });
                console.log(user);

                break;
            case providers.PHONE:
                //TODO
                break;

            default:
                throw new Error("Wrong provider");
        }

        const accessToken = generateAccessToken(
            { id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            "1d"
        );

        return res.status(200).json({
            success: true,
            message: `User Registered successfully`,
            accessToken,
            user,
        });
    } catch (error) {
        console.log("[VERIFY_USER_ERROR]", error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`,
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
        });

        if (!user)
            return res.status(400).json({
                success: false,
                message: `account not found`,
            });
        if (!user.comparePassword(password)) {
            return res.status(400).json({
                success: false,
                message: `wrong password`,
            });
        }

        const accessToken = generateAccessToken(
            { id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            "1d"
        );
        res.cookie("accessToken", accessToken);
        return res.status(200).json({
            success: true,
            message: `User Logged in successfully`,
        });
    } catch (error) {
        console.log("[LOGIN_USER_ERROR]", error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`,
        });
    }
};
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({
            success: true,
            message: `User Logged out successfully`,
        });
    } catch (error) {
        console.log("[LOGOUT_USER_ERROR]", error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`,
        });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        console.log("[GET_USER_PROFILE_ERROR]", error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`,
        });
    }
};
