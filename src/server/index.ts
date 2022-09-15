import express, { Express, Request, Response } from "express";

// Security
import cors from "cors";
import helmet from "helmet";

// TODO: HTTPS

// Root Router
import router from "../routes";

// * Create the express APP
const server: Express = express();

// * Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// from this point onover: "localhost:8000/api/.."
server.use("/api", router);

// static server
server.use(express.static("public"));

// TODO: Mongoose Connection

// * Security Config
server.use(cors());
server.use(helmet());

// * Content Type Config
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));

// * Redirection Config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get("/", (req: Request, res: Response) => {
  res.redirect("/api");
});

export default server;
