import { getUserId } from "@/lib/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma'; // Ensure prisma is properly imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Ensure you await the asynchronous getUserId function
    const userId = await getUserId(req, res);
    if (!userId) {
        // clear any session cookies or token

        return res.status(401).json({ message: 'Unauthorized' });
    }

    // get user profilepic
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
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
        const friendDetails: FriendDetails[] = await prisma.user.findMany({
            where: {
                id: {
                    in: friendIds
                }
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
                isOnline: true,
            }
        });

        // Get if there are any unseen mesages for the user
        const unseenMessages = await prisma.message.findMany({
            where: {
                receiverId: userId,
                seen: false
            },
            select: {
                senderId: true,
            }
        });


        // Update the friendDetails to include the newMessages true or false
        friendDetails.forEach(friend => {
            const hasUnseenMessage = unseenMessages.some(message => message.senderId === friend.id);
            friend.newMessages = hasUnseenMessage;
        });


        friendDetails.unshift({ id: userId, username: 'You', profilePic: user?.profilePic, isOnline: true });
        // console.log(friendDetails);


        return res.status(200).json({ data: friendDetails });
    } catch (error) {
        console.error('Failed to retrieve friends:', error);
        return res.status(500).json({ message: 'Failed to retrieve friends' });
    }
}
