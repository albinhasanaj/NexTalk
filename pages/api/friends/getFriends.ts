import { getUserId } from "@/lib/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma'; // Ensure prisma is properly imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Ensure you await the asynchronous getUserId function
    const userId = await getUserId(req, res);
    console.log(userId)
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find if this user has any friends
    try {
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { user1Id: userId },
                    { user2Id: userId }
                ]
            }
        });

        // Transform the data to only send relevant user details
        const friendIds = friends.map(friend => {
            if (friend.user1Id === userId) {
                return friend.user2Id;
            } else {
                return friend.user1Id;
            }
        });

        // Fetch the user details of the friends
        const friendDetails = await prisma.user.findMany({
            where: {
                id: {
                    in: friendIds
                }
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
            }
        });

        // console.log('Friends:', friendDetails);
        return res.status(200).json({ data: friendDetails });
    } catch (error) {
        console.error('Failed to retrieve friends:', error);
        return res.status(500).json({ message: 'Failed to retrieve friends' });
    }
}
