import jwt, { VerifyErrors } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Function to generate JWT
export const generateToken = (user: JwtPayload) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET!,
        { expiresIn: '30d' }
    );
};

interface NextApiRequestWithUser extends NextApiRequest {
    user?: JwtPayload;
}

export const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
};