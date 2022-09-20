import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM Imports
import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";

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
  }
  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: any = "";

    if (auth) {
      await loginUser(auth).then((res) => {
        LogSuccess("Logging user");
        response = {
          message: "User logged in successfully",
          token: res.token,
        };
      });
    } else {
      LogWarning("Login need Auth entity");
      response = {
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
}
