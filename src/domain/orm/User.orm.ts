import bcrypt from "bcrypt";
import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// CRUD
/**
 * Method to obtain all users from Collection "Users" in MongoDB
 * @returns
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    // Search all users
    return await userModel.find({ isDelete: false });
  } catch (error) {
    LogError(`[ORM ERROR] Getting All Users: ${error}`);
  }
};

// - Get User by ID
export const getUserById = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Search user by id
    return await userModel.findOne({ _id: id, isDelete: false });
  } catch (error) {
    LogError(`[ORM ERROR] Getting User by ID: ${error}`);
  }
};

// - Delete User by ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Delete user by id
    return await userModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR] Deleting User by ID: ${error}`);
  }
};

// - Create New User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Create new user
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR] Creating User: ${error}`);
  }
};

// - Update User by ID
export const updateUserById = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Update user by id
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ORM ERROR] Updating User by ID: ${error}`);
  }
};

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Register user
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR] Registring User by ID: ${error}`);
  }
};

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    let userFound: IUser | undefined = undefined;
    let token = undefined;
    // Check if user exists by email
    await userModel
      .findOne({ email: auth.email })
      .then((user) => {
        if (user) {
          userFound = user;
        }
      })
      .catch((error) => {
        LogError(`[ORM ERROR] Login User: ${error}`);
        throw new Error(`[ORM ERROR] Login User: ${error}`);
      });
    // Check if password is correct
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

    if (!validPassword) {
      LogError("password is not valid");
      throw new Error("password is not valid");
    }

    // Obtain Secret Key from .env
    let secretKey = process.env.SECRETKEY || "secretKey";

    // Create token
    token = jwt.sign(
      {
        email: userFound!.email,
      },
      secretKey,
      {
        expiresIn: "2h",
      }
    );

    return {
      user: userFound,
      token,
    };
  } catch (error) {
    LogError(`[ORM ERROR] Registring User by ID: ${error}`);
  }
};

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO: Implement register user
};
