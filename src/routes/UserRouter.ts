import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

//Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=63243d111eadd287737c42d8
usersRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo("Query Params: " + id);
    // Controller instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getUsers(id);
    // Send response
    return res.send(response);
  })
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo("Query Params: " + id);

    // Controller instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send response
    return res.send(response);
  })
  .post(async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    let email: any = req?.query?.email;
    let age: any = req?.query?.age;
    // Controller instance to execute method
    const controller: UserController = new UserController();

    let user = {
      name: name || "Default Name",
      email: email || "Default Email",
      age: age || 18,
    };

    // Obtain Response
    const response: any = await controller.createUser(user);
    // Send response
    return res.send(response);
  })
  .put(async (req: Request, res: Response) => {
    let id: any = req?.query?.id;
    let name: any = req?.query?.name;
    let email: any = req?.query?.email;
    let age: any = req?.query?.age;
    // Controller instance to execute method
    const controller: UserController = new UserController();

    let user = {
      name: name,
      email: email,
      age: age,
    };

    // Obtain Response
    const response: any = await controller.updateUser(id, user);
    // Send response
    return res.send(response);
  });

export default usersRouter;
