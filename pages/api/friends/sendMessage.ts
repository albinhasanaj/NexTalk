import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/getUserId";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
        return res.status(400).json({ message: 'Bad request' });
    }

    const senderId = await getUserId(req, res);
    if (!senderId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        console.log("Sending message")
        const message = await prisma.message.create({
            data: {
                content,
                senderId,
                receiverId
            }
        });

        return res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {

    }
};