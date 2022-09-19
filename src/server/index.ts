import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

// Swagger
import swaggerUi from "swagger-ui-express";

// Security
import cors from "cors";
import helmet from "helmet";

// TODO: HTTPS

// Root Router
import router from "../routes";

// * Create the express APP
const server: Express = express();

// * Swagger Config and route
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: { url: "/swagger.json", explorer: true },
  })
);

// * Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// from this point onover: "localhost:8000/api/.."
server.use("/api", router);

// static server
server.use(express.static("public"));

// Mongoose Connection
mongoose.connect("mongodb://localhost:27017/exampled");

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
