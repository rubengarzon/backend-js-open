import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";

import bcrypt from "bcrypt";

// Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

// body-parser
import bodyParser from "body-parser";
let jsonParser = bodyParser.json();

import { AuthController } from "../controller/AuthController";
import { IAuth } from "../domain/interfaces/IAuth.interface";

//Router from express
let authRouter = express.Router();

authRouter
  .route("/register")
  .post(jsonParser, async (req: Request, res: Response) => {
    let { name, email, password, age } = req?.body;
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
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  });

authRouter
  .route("/login")
  .post(jsonParser, async (req: Request, res: Response) => {
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
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  });

// Route protected by verify token middleware
authRouter
  .route("/me")
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the id of user
    let id: any = req?.query?.id;

    if (id) {
      // Controller instance to execute method
      const controller: AuthController = new AuthController();
      // Obtain Response
      const response: any = await controller.userData(id);
      // Send response
      return res.status(200).send(response);
    } else {
      return res
        .status(401)
        .send({ message: "You are not authorised to perform this action" });
    }
  });
export default authRouter;
