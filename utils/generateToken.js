import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function generateRandomSixDigitNumber() {
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = parseInt(randomBytes.toString('hex'), 16);
    const sixDigitNumber = randomNumber % 900000 + 100000;
    return sixDigitNumber;
}

export const generateToken = (payload) => {
    const activationCode = generateRandomSixDigitNumber();
    const token = jwt.sign({ ...payload, code: activationCode }, process.env.VERIFICATION_SECRET, { expiresIn: "10m" });

    return { activationCode, token };
}

export const verifyToken = (token, code) => {
    const data = jwt.verify(token, process.env.VERIFICATION_SECRET);

    if (!data) throw new Error("Invalid JWT");

    if (data.code !== code) throw new Error("Invalid Code");

    return data;
}