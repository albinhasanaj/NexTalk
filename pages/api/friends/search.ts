import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import cookie from 'cookie';
import { decodeToken } from "@/lib/generateAndValidateToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    let userId = '';
    let isGithubUser = false;

    // Get the user session from the nextauth header or cookie called token
    let session = await getSession({ req });
    if (session && session.user) {
        userId = session.user.id as string;
        isGithubUser = true;
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

    // Log the userId and isGithubUser for debugging
    console.log("User ID:", userId);
    console.log("Is GitHub User:", isGithubUser);

    const search = req.query.query as string;

    if (!search) {
        return res.status(400).json({ message: 'Bad request' });
    }

    try {
        // Fetch all users that match the search criteria
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: search } },
                    { email: { contains: search } }
                ]
            },
            select: {
                id: true,
                username: true,
                email: true,
                profilePic: true,
                githubId: true
            }
        });

        // Filter out the current user from the results
        const filteredUsers = users.filter(user =>
            user.id !== userId && user.githubId !== userId
        );

        // console.log("Filtered Users:", JSON.stringify(filteredUsers, null, 2));
        return res.status(200).json({ message: 'Users fetched successfully', data: filteredUsers });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
}
