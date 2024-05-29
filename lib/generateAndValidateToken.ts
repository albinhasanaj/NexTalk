import jwt, { VerifyErrors } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';


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

export const authenticateToken = (req: NextApiRequestWithUser, res: NextApiResponse, next: () => void) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        // Ensure that the decoded token is of type JwtPayload
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded as JwtPayload;  // Cast safely after checking
            next();
        } else {
            return res.status(403).json({ message: 'Token is invalid' });
        }
    });
};

export const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
};