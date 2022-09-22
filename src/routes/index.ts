/**
 * Root router
 * Redirections to Routers
 */
import express, { Request, Response } from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "../utils/logger";
import usersRouter from "./UserRouter";
import authRouter from "./AuthRouter";

// server instance
let server = express();

// router instance
let rootRouter = express.Router();

// Activate for requests to http://localhost:8000/api
// GET: http://localhost:8000/api
rootRouter.get("/", (req: Request, res: Response) => {
  LogInfo("GET: /api");
  res.send("Welcome to my API Restful: Express + Typescript + MongoDB");
});

// Redirections to Routers & Controllers
server.use("/", rootRouter); // http://localhost:8000/api
server.use("/hello", helloRouter); // http://localhost:8000/api/hello --> HelloRouter
// add more routers here
server.use("/users", usersRouter); // http://localhost:8000/api/users --> UserRouter
// Auth Router
server.use("/auth", authRouter); // http://localhost:8000/api/auth --> AuthRouter
export default server;
