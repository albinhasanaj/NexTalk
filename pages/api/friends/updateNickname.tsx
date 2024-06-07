import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/getUserId";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const { friendId, nickname } = req.body;
    const userId = await getUserId(req, res) as string;

    try {
        const friend = await prisma.friend.findFirst({
            where: {
                OR: [
                    { user1Id: userId, user2Id: friendId },
                    { user1Id: friendId, user2Id: userId }
                ]
            }
        });

        console.log("Friend relation:", friend);

        if (!friend) {
            console.log("Friend not found");
            return res.status(404).json({ message: 'Friend not found', error: 'No friend relation found with this ID' });
        }

        const isUser1 = friend.user1Id === userId;

        const updatedFriend = await prisma.friend.update({
            where: { id: friend.id },
            data: isUser1 ? { nickname1: nickname } : { nickname2: nickname }
        });

        console.log("Updated friend relation:", updatedFriend)

        if (!updatedFriend) {
            console.log("Friend relation not updated");
            return res.status(500).json({ message: 'Failed to update nickname', error: 'Friend relation not updated' });
        }

        return res.status(200).json(updatedFriend);

    } catch (error) {
        console.error("Failed to update nickname:", error);
        return res.status(500).json({ message: 'Failed to update nickname', error });
    }
};