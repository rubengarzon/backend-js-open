import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Configuration the .env file
dotenv.config();

// Create the express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Define the first route of APP
app.get("/", (req: Request, res: Response) => {
  //Send Hello World
  res.send("Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose");
});

app.get("/hello", (req: Request, res: Response) => {
  res.send(
    "Welcome to GET Route: Hello!"
  );
});

// Execute APP and listen the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
