import { Server } from "socket.io";
import http from "http";

const userSocketMap = {}; // { userId: socketId }
let io; // Declare io variable

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export const initSocket = (app) => {
    const server = http.createServer(app);
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST"],
        },
    });

    // Handle socket connections
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        const userId = socket.handshake.query.userId; // Get userId from query
        if (userId) userSocketMap[userId] = socket.id;

        // Notify all clients of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // Handle user disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });

        // Example event for sending messages
        socket.on("sendMessage", (data) => {
            const { receiverId, message } = data;
            const receiverSocketId = userSocketMap[receiverId];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveMessage", { message, senderId: userId });
            }
        });
    });

    return server; // Return the server instance for further use
};

// Export the io instance for use in other files
export { io };
