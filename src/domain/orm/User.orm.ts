import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";

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

// TODO:
// - Get User by Email
