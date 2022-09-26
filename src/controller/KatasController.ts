import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

import {
  getAllKatas,
  getKataById,
  updateKataById,
  deleteKataById,
  createKata,
} from "../domain/orm/Kata.orm";
import { IKata } from "../domain/interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController {
  /**
   * Endpoint to get all katas in the collection "Katas" of DB
   * @param {string} id  Kata ID
   * @returns  Kata Object
   */
  @Get("/")
  public async getKatas(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/katas] Get Katas by ID: ${id}`);
      response = await getKataById(id);
    } else {
      LogSuccess("[/api/katas] Get All Katas Request");
      response = await getAllKatas(page, limit);
    }
    return response;
  }

  /**
   * Endpoint to delete a kata by id in the collection "Katas" of DB
   * @param {string} id  ID of the kata to delete
   * @returns  Response message
   */
  @Delete("/")
  public async deleteKata(@Query() id?: string): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/katas] Delete kata by ID: ${id}`);
      await deleteKataById(id).then((res) => {
        response = {
          message: "Kata deleted successfully",
          status: 204,
        };
      });
    } else {
      LogWarning("[/api/katas] Delete kata by id without ID");
      response = {
        message: "No ID provided",
        status: 400,
      };
    }
    return response;
  }

  /**
   * Endpoint to update a kata by id in the collection "Katas" of DB
   * @param id  ID of the kata to update
   * @param kata  Kata object to update
   * @returns  Response message
   */
  @Put("/")
  public async updateKata(
    @Query() id: string,
    @Query() kata: IKata
  ): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/katas] Update kata by ID: ${id}`);
      await updateKataById(id, kata).then((res) => {
        response = {
          message: "Kata updated successfully",
          status: 204,
        };
      });
    } else {
      LogWarning("[/api/katas] Updated kata by id without ID");
      response = {
        status: 400,
        message: "No ID provided to update kata",
      };
    }
    return response;
  }
  /**
   * Endpoint to create a kata in the collection "Katas" of DB
   * @param kata  Kata object to create
   * @returns  Response message
   */
  @Post("/")
  public async createKata(kata: IKata): Promise<any> {
    let response: any = "";

    if (kata) {
      await createKata(kata).then((res) => {
        LogSuccess("Creating user");
        response = {
          message: "Kata created successfully",
        };
      });
    } else {
      LogWarning("Create need Kata entity");
      response = {
        message: "provide kata entity to create",
      };
    }
    return response;
  }
}
