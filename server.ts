import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { decodeToken } from "./lib/generateAndValidateToken";
import prisma from "./lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port: number = parseInt(process.env.PORT || "5000");

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
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
        .listen(port, () => [
            console.log(`Server running on http://${hostname}:${port}`)
        ])
});