// server.js
import express from 'express';
import dotenv from 'dotenv';
import { CONNECTMONGOdb } from './connection.js';
import CookieParser from 'cookie-parser';
import router from './routes/authroute.js';
import messagerouter from './routes/messageroute.js';
import userroute from './routes/userroute.js';
import { initSocket } from './socket/socket.js'; // Import the socket initializer

dotenv.config();

const app = express(); // Create app here and pass it to the socket later
const PORT = process.env.PORT || 8000;

// MongoDB connection
CONNECTMONGOdb('mongodb://localhost:27017/chatapp')
    .then(() => {
        console.log('DB connected successfully');
    })
    .catch(() => {
        console.log('DB connection failed');
    });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(CookieParser());

app.use('/api/auth', router);
app.use('/api/message', messagerouter);
app.use('/api/users', userroute);

// Initialize Socket.IO and create the server
const server = initSocket(app); // Pass the express app to the socket initializer

// Use the returned server to listen
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
