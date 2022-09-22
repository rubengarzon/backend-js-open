import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interface";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Read all users from database || Read user by ID
  getUsers(page: number, limit: number, id?: string): Promise<any>;
  // Delete user by ID
  deleteUser(id?: string): Promise<any>;
  // Update user by ID
  updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
  // Login
  loginUser(auth: any): Promise<any>;
  // Register
  registerUser(user: IUser): Promise<any>;
}
