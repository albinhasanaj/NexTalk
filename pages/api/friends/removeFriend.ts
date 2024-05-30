import { getUserId } from "@/lib/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma'; // Ensure prisma is properly imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { friendId } = req.body;
    if (!friendId) {
        return res.status(400).json({ message: 'Bad request' });
    }
    const userId = await getUserId(req, res);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // access the database and remove the friend given the friendId
    try {
        const friend = await prisma.friend.delete({
            where: {
                user1Id_user2Id: {
                    user1Id: userId,
                    user2Id: friendId
                }
            }
        });

        return res.status(200).json({ message: 'Friend removed successfully', data: friend });
    } catch (error) {
        console.error("Failed to remove friend:", error);
        return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
}
