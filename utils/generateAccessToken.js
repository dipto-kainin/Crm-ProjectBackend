import jwt from 'jsonwebtoken';

export function generateAccessToken(payload, secretKey, expiresIn) {
    return jwt.sign(payload, secretKey, { expiresIn });
}


