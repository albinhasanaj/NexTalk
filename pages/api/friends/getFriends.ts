import { getUserId } from "@/lib/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma'; // Ensure prisma is properly imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const userId = await getUserId(req, res);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch friends with nicknames
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { user1Id: userId },
                    { user2Id: userId }
                ]
            },
            include: {
                user1: {
                    select: { id: true, username: true, profilePic: true, isOnline: true }
                },
                user2: {
                    select: { id: true, username: true, profilePic: true, isOnline: true }
                }
            }
        });

        // Combine user details with nicknames
        const friendDetails: FriendDetails[] = friends.map(friend => {
            const otherUser = friend.user1Id === userId ? friend.user2 : friend.user1;
            return {
                id: otherUser.id,
                username: otherUser.username,
                profilePic: otherUser.profilePic,
                isOnline: otherUser.isOnline,
                newMessages: false,  // This will be updated in the next steps
                nickname: friend.user1Id !== userId ? friend.nickname2 : friend.nickname1,
                isPinned: friend.user1Id !== userId ? friend.user1Pinned : friend.user2Pinned
            };
        });

        // sort friends by pinned status
        friendDetails.sort((a, b) => {
            if (a.isPinned && !b.isPinned) {
                return -1;
            }
            if (!a.isPinned && b.isPinned) {
                return 1;
            }
            return 0;
        });

        // Retrieve any unseen messages
        const unseenMessages = await prisma.message.findMany({
            where: {
                receiverId: userId,
                seen: false
            },
            select: {
                senderId: true,
            }
        });

        // Mark friends with new messages
        friendDetails.forEach(friend => {
            friend.newMessages = unseenMessages.some(message => message.senderId === friend.id);
        });

        const isGithubUser = !!user.githubId;

        friendDetails.unshift({ id: userId, username: 'You', profilePic: user?.profilePic, isOnline: true, isGithubUser });

        return res.status(200).json({ data: friendDetails });
    } catch (error) {
        console.error('Failed to retrieve friends:', error);
        return res.status(500).json({ message: 'Failed to retrieve friends' });
    }
}
