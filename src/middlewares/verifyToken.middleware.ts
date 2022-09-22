import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRETKEY || "secretKey";

/**
 * Middleware to verify if the token is valid
 * @param {Request} req  Request object
 * @param {Response} res  Response object
 * @param {NextFunction} next  Next function
 * @returns  Response object
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check HEADER from request for 'x-access-token'
  const token: any = req.header("x-access-token");

  // Check if token exists
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // Verify token
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    // Execute Next Function -> Protected Route will be executed
    next();
  });
};
