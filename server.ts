import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import prisma from "./lib/prisma";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port: number = parseInt(process.env.PORT || "5000");


const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        // allow for transports other than websocket
        transports: ["websocket", "polling"],
    });

    const userSockets = new Map();
    const userActiveChats = new Map();

    io.on("connection", async (socket) => {
        console.log("A user connected");

        socket.on("register", async ({ userId }) => {
            // Register the new connection
            console.log("User registered:", userId);
            userSockets.set(userId, socket.id);
            await notifyFriendsStatusChange(userId, true, io, userSockets); // Notify friends that user is online
        });

        socket.on("disconnect", async () => {
            // Find which user is disconnecting
            const userId = Array.from(userSockets.entries()).find(([_, v]) => v === socket.id)?.[0];
            if (userId) {
                userSockets.delete(userId);
                await notifyFriendsStatusChange(userId, false, io, userSockets); // Notify friends that user is offline
            }
        });

        socket.on("reaction", async ({ senderId, receiverId, reaction }) => {
            const receiverSocketId = userSockets.get(receiverId);
            const senderSocketId = userSockets.get(senderId);
            const receiverActiveChat = userActiveChats.get(receiverId);
            const senderActiveChat = userActiveChats.get(senderId);

            if (receiverActiveChat === senderId && senderActiveChat === receiverId) {
                io.to(receiverSocketId).emit("reaction", { senderId, reaction });
                io.to(senderSocketId).emit("reaction", { senderId, reaction });
            } else {
                io.to(senderSocketId).emit("reaction", { senderId, reaction });
            }

        });

        socket.on('user-logout', async ({ userId }) => {
            userSockets.delete(userId);
            await notifyFriendsStatusChange(userId, false, io, userSockets);
        });

        socket.on("view-chat", async ({ userId, friendId }) => {
            userActiveChats.set(userId, friendId);
            // mark all messages as seen by the receiver
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

            // emit to clear the newMessages count for the receiver

            const receiverSocketId = userSockets.get(userId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("seen-new-message-all", { count: 0, senderId: friendId });
            }
        });

        socket.on("leave-chat", async ({ userId }) => {
            userActiveChats.delete(userId);
        });

        socket.on("new-message", async (msg) => {
            try {
                const { content, senderId, receiverId } = msg;
                const receiverSocketId = userSockets.get(receiverId);
                const senderSocketId = userSockets.get(senderId);
                const receiverActiveChat = userActiveChats.get(receiverId);
                const senderActiveChat = userActiveChats.get(senderId);

                const message = await prisma.message.create({
                    data: {
                        content,
                        senderId,
                        receiverId,
                        seen: false
                    },
                    include: {
                        sender: {
                            select: {
                                profilePic: true
                            }
                        },
                    }
                });

                if (receiverActiveChat !== senderId) {
                    // If receiver is not in the sender's chat, just update the unread messages count
                    const hasSeenMessage = true;

                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit("seen-new-message-all", { hasSeenMessage, senderId });
                    }
                }

                console.log("Receiver Active Chat", receiverActiveChat)
                console.log("Sender Active Chat", senderActiveChat)

                console.log("ReceiverID", receiverId)
                console.log("SenderID", senderId)

                if (receiverActiveChat === senderId && senderActiveChat === receiverId) {
                    // If both sender and receiver are in each other's chat, emit the message
                    io.to(receiverSocketId).emit("message", {
                        ...message,
                        isSender: false
                    });

                    io.to(senderSocketId).emit("message", {
                        ...message,
                        isSender: true
                    });
                } else {
                    io.to(senderSocketId).emit("message", {
                        ...message,
                        isSender: true
                    });
                }

            } catch (error) {
                console.error("Failed to save message:", error);
                // Handle error appropriately
            }
        });

        socket.on("update-nickname", async (userId, friendId, nickname) => {
            console.log("Updated nickname:", userId, friendId, nickname);

            try {
                const friend = await prisma.friend.findFirst({
                    where: {
                        OR: [
                            { user1Id: userId, user2Id: friendId },
                            { user1Id: friendId, user2Id: userId }
                        ]
                    }
                });

                if (!friend) {
                    console.log("Friend not found");
                    return;
                }

                const isUser1 = friend.user1Id === userId;

                const updatedFriend = await prisma.friend.update({
                    where: { id: friend.id },
                    data: isUser1 ? { nickname1: nickname } : { nickname2: nickname }
                });

                if (!updatedFriend) {
                    console.log("Friend relation not updated");
                    return;
                }

                const userSocketId = userSockets.get(userId);
                console.log("User Socket ID:", userSocketId);

                console.log("Friend ID:", friendId);
                console.log("Nickname:", nickname);
                if (userSocketId) {
                    io.to(userSocketId).emit("updated-nickname", { friendId: friendId, nickname: nickname });
                }

            } catch (error) {
                console.error("Failed to update nickname:", error);
                // Handle error appropriately
            }
        });

        socket.on("update-pin", async (userId, friendId, isPinned) => {
            console.log("Updated pin:", userId, friendId, isPinned);
            try {
                const friend = await prisma.friend.findFirst({
                    where: {
                        OR: [
                            { user1Id: userId, user2Id: friendId },
                            { user1Id: friendId, user2Id: userId }
                        ]
                    }
                });

                if (!friend) {
                    console.log("Friend not found");
                    return;
                }

                const isUser1 = friend.user1Id === userId;

                const updatedFriend = await prisma.friend.update({
                    where: { id: friend.id },
                    data: !isUser1 ? { user1Pinned: isPinned } : { user2Pinned: isPinned },
                });

                if (!updatedFriend) {
                    console.log("Friend relation not updated");
                    return;
                }

                console.log("Updated friend relation:", updatedFriend);

                const userSocketId = userSockets.get(userId);
                console.log("User Socket ID:", userSocketId);

                if (userSocketId) {
                    io.to(userSocketId).emit("fetch-friends");
                }

            } catch (error) {
                console.error("Failed to update pin:", error);
                // Handle error appropriately
            }
        });
    });


    httpServer
        .once("Error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, "0.0.0.0", () => [ //0.0.0.0 for development because it allows access from other devices
            console.log(`Server running on http://${hostname}:${port}`)
        ])
});

async function notifyFriendsStatusChange(userId: string, isOnline: boolean, io: any, userSockets: Map<any, any>) {
    // Fetch all friends relations where the current user is either user1 or user2
    const friendsRelations = await prisma.friend.findMany({
        where: {
            OR: [
                { user1Id: userId },
                { user2Id: userId }
            ]
        },
        include: {
            user1: true,
            user2: true
        }
    });

    // Create a list of unique friend IDs from the relations
    const friendIds = new Set();
    friendsRelations.forEach(friend => {
        if (friend.user1Id === userId) {
            friendIds.add(friend.user2Id); // Add user2 if user1 is the current user
        } else {
            friendIds.add(friend.user1Id); // Add user1 if user2 is the current user
        }
    });

    // Emit to each friend's socket if they are connected
    friendIds.forEach(friendId => {
        const friendSocketId = userSockets.get(friendId);
        if (friendSocketId) {
            io.to(friendSocketId).emit('friend-status-changed', { userId, isOnline });
        }
    });

    // Optionally, update the user's online status in the database
    await prisma.user.update({
        where: { id: userId },
        data: { isOnline }
    });
}