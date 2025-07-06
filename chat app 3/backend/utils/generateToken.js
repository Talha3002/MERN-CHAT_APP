import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; // Make sure to install uuid

export const generateTokenAndSetCookie = async (userId, res, clearCookie = false) => {
    if (clearCookie) {
        res.cookie("jwt", "", { maxAge: 0 }); // Clear old token
        res.cookie("sessionId", "", { maxAge: 0 }); // Clear old session ID
    }

    const sessionId = uuidv4(); // Generate a unique session ID
    const token = jwt.sign({ userId, sessionId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });

    res.cookie("sessionId", sessionId, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};
