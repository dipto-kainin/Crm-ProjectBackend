import { providers } from '../constant/provider.js';
import { testEmail } from '../utils/verifyEmail.js';
import { User } from '../model/User.js';
import { generateAccessToken } from '../utils/generateAccessToken.js';

export const registerUser = async (req, res) => {
    try {
        const { provider, email, phone, password, role, name } = req.body;

        if (!password) throw new Error("Invalid password");

        switch (provider) {
            case providers.EMAIL:
                if (!email || testEmail(email)) throw new Error("Invalid email");
                const { activationCode, token } = generateToken({ email, name, password, role, phone, provider });
                return res.status(200).json({
                    success: true,
                    verificationToken: token,
                    activationCode,
                    message: `Verification code will be expired in 5 minutes`
                });
            case providers.PHONE:
                // TODO
                break;
            default:
                throw new Error("Wrong provider");
        }

    } catch (error) {
        console.log('[REGISTER_USER]', error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`
        });
    }
}

export const verifyUser = async (req, res) => {
    try {
        const { verificationToken, activationCode } = req.body;
        const payload = verifyToken(verificationToken, activationCode);
        if (!payload) throw new Error("Token manifested");

        const { email, name, password, role, phone, provider } = payload;
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
                break;
            case providers.PHONE:
                //TODO
                break;

            default: throw new Error("Wrong provider");
        }

        const accessToken = generateAccessToken({ id: user._id, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({
            success: true,
            message: `User Registered successfully`,
            accessToken
        });

    } catch (error) {
        console.log('[REGISTER_USER]', error);
        return res.status().json({
            success: true,
            message: `Internal Server Error`
        });
    }
}