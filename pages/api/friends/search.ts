import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/getUserId";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const userId = await getUserId(req, res);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

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
