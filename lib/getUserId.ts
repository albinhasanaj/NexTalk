import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { decodeToken } from "./generateAndValidateToken";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUserId = async (req: NextApiRequest, res: NextApiResponse) => {
    let userId = "";
    let session = await getServerSession(req, res, authOptions);
    if (session && session.user) {
        userId = session.user.id as string;
        const user = await prisma.user.findFirst({
            where: {
                githubId: userId
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'Not found', error: 'User not found' });
        }
        userId = user.id;
    } else {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                userId = decodedToken.id;
            } else {
                return res.status(403).json({ message: 'Forbidden', error: 'Invalid token' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
        }
    }

    return userId;
};