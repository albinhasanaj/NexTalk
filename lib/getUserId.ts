import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { decodeToken } from "./generateAndValidateToken";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const extractUserId = async (token: string | null): Promise<string | null> => {
    if (!token) return null;

    try {
        const decodedToken = decodeToken(token);
        if (!decodedToken) return null;
        return decodedToken.id;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const getUserId = async (req: NextApiRequest, res: NextApiResponse) => {
    let userId = null;
    const session = await getServerSession(req, res, authOptions);
    if (session && session.user) {
        const user = await prisma.user.findFirst({
            where: {
                githubId: session.user.id as string
            }
        });
        if (!user) {
            res.status(404).json({ message: 'User not found', error: 'No user associated with this GitHub ID' });
            return null;
        }
        userId = user.id;
    } else {
        const cookies = cookie.parse(req.headers.cookie || '');
        userId = await extractUserId(cookies.token);
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized', error: 'Invalid or expired token' });
            return null;
        }
    }

    return userId;
};