import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM Imports
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
} from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    let response: any = "";

    if (user) {
      await registerUser(user).then((res) => {
        LogSuccess("Registering user");
        response = {
          message: "User registered successfully",
        };
      });
    } else {
      LogWarning("Register need User entity");
      response = {
        message: "provide user entity to register",
      };
    }
    return response;
  }
  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined;

    if (auth) {
      let data = await loginUser(auth);
      response = {
        token: data.token,
        message: `Welcome ${data.user.name}`,
      };
    } else {
      LogWarning("Login need Auth entity");
      response = {
        error: "Email and password are required",
        message: "provide auth entity to login",
      };
    }

    return response;
  }
  @Post("/logout")
  public async logoutUser(): Promise<any> {
    let response: any = "";
    // TODO: Implement logout user
    throw new Error("Method not implemented.");
  }
  @Get("/me")
  public async userData(@Query() id: string): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess("Getting user data");
      response = await getUserById(id);
      // Remove the password
      response.password = "";
    }

    return response;
  }
}
