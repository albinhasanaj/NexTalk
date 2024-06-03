import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import prisma from "./lib/prisma";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port: number = parseInt(process.env.PORT || "5000");

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        // allow for trnasports
        transports: ["websocket", "polling"],
    });

    const userSockets = new Map();

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

        socket.on('user-logout', async ({ userId }) => {
            userSockets.delete(userId);
            await notifyFriendsStatusChange(userId, false, io, userSockets);
        });

        socket.on("new-message", async (msg) => {
            try {
                const { content, senderId, receiverId } = msg;
                const message = await prisma.message.create({
                    data: {
                        content,
                        senderId,
                        receiverId
                    },
                    include: {
                        sender: {
                            select: {
                                profilePic: true

                            }
                        },
                    }
                });

                // Emit the message back to all clients (including the sender)
                io.emit("message", message);
            } catch (error) {
                console.error("Failed to save message:", error);
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