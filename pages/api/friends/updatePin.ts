import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/getUserId";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { friendId, isPinned } = req.body;
    const userId = await getUserId(req, res) as string;

    try {
        const friend = await prisma.friend.findFirst({
            where: {
                OR: [
                    { user1Id: userId, user2Id: friendId },
                    { user1Id: friendId, user2Id: userId },
                ],
            },
        });

        if (!friend) {
            return res.status(404).json({ message: "Friend not found", error: "No friend relation found with this ID" });
        }

        const isUser1 = friend.user1Id === userId;

        const updatedFriend = await prisma.friend.update({
            where: { id: friend.id },
            data: !isUser1 ? { user1Pinned: isPinned } : { user2Pinned: isPinned },
        });

        console.log("Updated friend relation:", updatedFriend);

        if (!updatedFriend) {
            return res.status(500).json({ message: "Failed to update pin", error: "Friend relation not updated" });
        }

        return res.status(200).json(updatedFriend);

    } catch (error) {
        return res.status(500).json({ message: "Failed to update pin", error });
    }
};