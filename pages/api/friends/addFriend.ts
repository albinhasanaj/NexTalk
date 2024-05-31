import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/getUserId";

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

    // Check if the friend is already added
    const existingFriend = await prisma.friend.findMany({
        where: {
            OR: [
                {
                    user1Id: userId,
                    user2Id: friendId
                }, {
                    user1Id: friendId,
                    user2Id: userId
                }
            ]
        }
    });



    if (existingFriend.length > 0) {
        return res.status(400).json({ message: 'Friend already added' });
    }

    try {
        const newFriend = await prisma.friend.create({
            data: {
                user1Id: userId,
                user2Id: friendId
            }
        });

        return res.status(201).json({ message: 'Friend added successfully', data: newFriend });
    } catch (error) {
        console.error("Failed to add friend:", error);
        return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
}