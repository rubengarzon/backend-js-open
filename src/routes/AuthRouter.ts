import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";

import bcrypt from "bcrypt";
import { AuthController } from "@/controller/AuthController";
import { IAuth } from "../domain/interfaces/IAuth.interface";

//Router from express
let authRouter = express.Router();

authRouter.route("/auth/register").post(async (req: Request, res: Response) => {
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
    };

    // Controller instance to execute method
    const controller: AuthController = new AuthController();
    // Obtain Response
    const response: any = await controller.registerUser(newUser);
    // Send response
    res.status(200).send(response);
  }
});

authRouter.route("/auth/login").post(async (req: Request, res: Response) => {
  let { email, password } = req.body;

  if (email && password) {
    // Controller instance to execute method
    const controller: AuthController = new AuthController();

    let auth: IAuth = {
      email: email,
      password: password,
    };

    // Obtain Response
    const response: any = await controller.loginUser(auth);
    // Send response
    res.status(200).send(response);
  }
});

export default authRouter;
