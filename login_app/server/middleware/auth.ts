import { NextFunction, Request, Response } from "express";
import ENV from "../config";
import jwt from "jsonwebtoken";
import RequestUser from "../model/requestUser";

const Auth = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        // Access authorize header to validate request
        const token = req.headers.authorization?.split(" ")[1];

        // Retrieve the user details for the logged-in user
        if (token) {
            const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
            req.user = decodedToken;
            next(); // Continue to the next middleware or route handler
        } else {
            // No token provided, send authentication failed response
            res.status(401).json({ error: "Authentication Failed!" });
        }
    } catch (error) {
        // Handle any errors that occur during authentication
        res.status(401).json({ error: "Authentication Failed!" });
    }
};

export default Auth;
