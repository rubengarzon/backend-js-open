import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUserById,
} from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
  /**
   * Endpoint to get all users in the collection "Users" of DB
   * @param {string} id  User ID
   * @returns  User Object
   */
  @Get("/")
  public async getUsers(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/users] Get User by ID: ${id}`);
      response = await getUserById(id);
    } else {
      LogSuccess("[/api/users] Get All Users Request");
      response = await getAllUsers(page, limit);
    }
    return response;
  }

  /**
   * Endpoint to delete a user by id in the collection "Users" of DB
   * @param {string} id  ID of the user to delete
   * @returns  Response message
   */
  @Delete("/")
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/users] Delete user by ID: ${id}`);
      await deleteUserById(id).then((res) => {
        response = {
          message: "User deleted successfully",
          status: 204,
        };
      });
    } else {
      LogWarning("[/api/users] Delete user by id without ID");
      response = {
        message: "No ID provided",
        status: 400,
      };
    }
    return response;
  }

  /**
   * Endpoint to update a user by id in the collection "Users" of DB
   * @param id  ID of the user to update
   * @param user  User object to update
   * @returns  Response message
   */
  @Put("/")
  public async updateUser(
    @Query() id: string,
    @Query() user: any
  ): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/users] Update user by ID: ${id}`);
      await updateUserById(id, user).then((res) => {
        response = {
          message: "User updated successfully",
          status: 204,
        };
      });
    } else {
      LogWarning("[/api/users] Updated user by id without ID");
      response = {
        status: 400,
        message: "No ID provided to update user",
      };
    }
    return response;
  }
}
