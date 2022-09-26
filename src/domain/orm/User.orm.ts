import bcrypt from "bcrypt";
import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsersResponse } from "../types/UsersResponse.type";
import { kataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";
dotenv.config();

// CRUD
/**
 * Method to obtain all users from Collection "Users" in MongoDB
 * @returns
 */
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    let response: any = {};

    // Search all users (pagination)
    await userModel
      .find({ isDeleted: false })
      .select("name email age katas")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        response.users = users;
      });

    // Count all users
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR] Getting All Users: ${error}`);
  }
};
export const getKatasFromUser = async (
  page: number,
  limit: number,
  id: string
): Promise<any[] | undefined> => {
  let userModel = userEntity();
  let katasModel = kataEntity();

  let katasFound: IKata[] = [];

  let response: any = {};

  await userModel
    .findById(id)
    .then(async (user: IUser) => {
      response.user = user.email;

      // Create types to search
      let objectIds: mongoose.Types.ObjectId[] = [];
      user.katas.forEach((kataID: any) => {
        let objectID = new mongoose.Types.ObjectId(kataID);
        objectIds.push(objectID);
      });

      await katasModel.find({ "_id": { "$in": objectIds } }).then((katas: IKata[]) => {
        katasFound = katas;
      });
    })
    .catch((error) => {
      LogError(`[ORM ERROR] Obtaining User: ${error}`);
    });

  response.katas = katasFound;


  return response;
};

// - Get User by ID
export const getUserById = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Search user by id
    return await userModel.findById(id).select("name email age katas");
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
