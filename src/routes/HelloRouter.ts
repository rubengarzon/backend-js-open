import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../utils/logger";

//Router from express
let helloRouter = express.Router();

// http://localhost:8000/api/hello?name=John
helloRouter.route("/").get(async (req: Request, res: Response) => {
  // Get the name from the query string
  let name: any = req?.query?.name;
  LogInfo("Query Params: " + name);
  // Controller instance to execute method
  const controller: HelloController = new HelloController();
  // Obtain Response
  const response = await controller.getMessage(name);
  // Send response
  return res.send(response);
});

export default helloRouter;