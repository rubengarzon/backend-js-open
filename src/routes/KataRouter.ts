import { KataLevel } from "./../domain/interfaces/IKata.interface";
import express, { Request, Response } from "express";
import { KatasController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";
import { IKata } from "../domain/interfaces/IKata.interface";

import bcrypt from "bcrypt";
import { AuthController } from "../controller/AuthController";

import bodyParser from "body-parser";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { updateKataById } from "../domain/orm/Kata.orm";
let jsonParser = bodyParser.json();

//Router from express
let katasRouter = express.Router();

// http://localhost:8000/api/katas?id=63243d111eadd287737c42d8
katasRouter
  .route("/")
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;
    LogInfo("Query Params: " + id + " " + page + " " + limit);
    // Controller instance to execute method
    const controller: KatasController = new KatasController();
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id);
    // Send response
    return res.status(200).send(response);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo("Query Params: " + id);

    // Controller instance to execute method
    const controller: KatasController = new KatasController();
    // Obtain Response
    const response: any = await controller.deleteKata(id);
    // Send response
    return res.status(response.status).send(response);
  })
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;

    // Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || "";
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.stars || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution || "";
    let participants: string[] = req?.body?.participants || [];

    if (
      name &&
      description &&
      level &&
      intents &&
      stars &&
      creator &&
      solution &&
      participants
    ) {
      // Controller instance to execute method
      const controller: KatasController = new KatasController();

      let kata: IKata = {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants,
      };

      // Obtain Response
      const response: any = await controller.updateKata(id, kata);
      // Send response
      return res.status(response.status).send(response);
    } else {
      return res.status(400).send({
        message: "[ERROR] Updating Kata. You need to send all attrs of kata.",
        status: 400,
      });
    }
  })
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    // Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || "Default description";
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 1;
    let stars: number = req?.body?.stars || 1;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution || "Default Solution";
    let participants: string[] = req?.body?.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants
    ) {
      const controller: KatasController = new KatasController();

      let kata: IKata = {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants,
      };

      const response: any = await controller.createKata(kata);

      return res.status(201).send(response);
    } else {
      return res.status(400).send({
        message: "[ERROR] Creating Kata. You need to send all attrs of kata.",
        status: 400,
      });
    }
  });

export default katasRouter;
