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

    try {
        // Try deleting assuming user1Id is userId and user2Id is friendId
        const friend = await prisma.friend.deleteMany({
            where: {
                OR: [
                    { user1Id: userId, user2Id: friendId },
                    { user1Id: friendId, user2Id: userId }
                ]
            }
        });

        if (friend.count > 0) {
            return res.status(200).json({ message: 'Friend removed successfully' });
        } else {
            return res.status(404).json({ message: 'No friend found to remove' });
        }
    } catch (error) {
        console.error("Failed to remove friend:", error);
        return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
}
