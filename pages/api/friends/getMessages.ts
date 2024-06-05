import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/getUserId";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const friendId = req.query.friendId as string;
    if (!friendId) {
        return res.status(400).json({ message: 'Bad request' });
    }

    const userId = await getUserId(req, res);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        receiverId: friendId
                    }, {
                        senderId: friendId,
                        receiverId: userId
                    }
                ]
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                sender: true,
                receiver: true
            }

        });

        // Mark all messages as seen by the receiver
        await prisma.message.updateMany({
            where: {
                receiverId: userId,
                senderId: friendId,
                seen: false
            },
            data: {
                seen: true
            }
        });

        // Enhance messages by adding isSender flag
        const enhancedMessages = messages.map(message => ({
            ...message,
            isSender: message.senderId === userId  // Check if the logged-in user is the sender
        }));

        res.status(200).json({ messages: enhancedMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}