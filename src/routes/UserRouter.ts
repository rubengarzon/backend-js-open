import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";

import bcrypt from "bcrypt";
import { AuthController } from "../controller/AuthController";

import bodyParser from "body-parser";
import { verifyToken } from "../middlewares/verifyToken.middleware";
let jsonParser = bodyParser.json();

//Router from express
let usersRouter = express.Router();

// http://localhost:8000/api/users?id=63243d111eadd287737c42d8
usersRouter
  .route("/")
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    let email: any = req?.query?.email;
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;
    LogInfo("Query Params: " + id + " " + page + " " + limit + " " + email);
    // Controller instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getUsers(page, limit, id, email);
    // Send response
    return res.status(200).send(response);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo("Query Params: " + id);

    // Controller instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send response
    return res.status(response.status).send(response);
  })
  .put(async (req: Request, res: Response) => {
    let id: any = req?.query?.id;
    let name: any = req?.query?.name;
    let email: any = req?.query?.email;
    let age: any = req?.query?.age;
    let katas: any = req?.query?.katas;
    console.log(
      "Query Params: " + id + " " + name + " " + email + " " + age + " " + katas
    );
    // Controller instance to execute method
    const controller: UserController = new UserController();

    let user = {
      name: name,
      email: email,
      age: age,
      katas: katas,
    };

    // Obtain Response
    const response: any = await controller.updateUser(id, user);
    // Send response
    return res.status(response.status).send(response);
  });

usersRouter
  .route("/auth/register")
  .post(async (req: Request, res: Response) => {
    let { name, email, password, age } = req.body;
    let hashedPassword = "";
    if (name && email && password && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcrypt.hashSync(password, 8);

      let newUser: IUser = {
        name: name,
        email: email,
        password: hashedPassword,
        age: age,
        katas: [],
      };

      // Controller instance to execute method
      const controller: AuthController = new AuthController();
      // Obtain Response
      const response: any = await controller.registerUser(newUser);
    }
  });

usersRouter
  .route("/katas")
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo("Query Params: " + id);

    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    // Controller instance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id);
    // Send response
    return res.status(200).send(response);
  });

export default usersRouter;
