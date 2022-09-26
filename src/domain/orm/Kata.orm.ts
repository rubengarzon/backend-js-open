import bcrypt from "bcrypt";
import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";
import dotenv from "dotenv";
dotenv.config();

// CRUD
/**
 * Method to obtain all katas from Collection "Katas" in MongoDB
 * @returns
 */
export const getAllKatas = async (
  page: number,
  limit: number
): Promise<any[] | undefined> => {
  try {
    let kataModel = kataEntity();

    let response: any = {};

    // Search all katas (pagination)
    await kataModel
      .find({ isDeleted: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });

    // Count all katas
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR] Getting All Katas: ${error}`);
  }
};

// - Get Kata by ID
export const getKataById = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Search kata by id
    return await kataModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR] Getting Kata by ID: ${error}`);
  }
};

// - Delete Kata by ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Delete kata by id
    return await kataModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR] Deleting Kata by ID: ${error}`);
  }
};

// - Create New Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Create new kata
    return await kataModel.create(kata);
  } catch (error) {
    LogError(`[ORM ERROR] Creating Kata: ${error}`);
  }
};

// - Update Kata by ID
export const updateKataById = async (
  id: string,
  kata: IKata
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Update user by id
    return await kataModel.findByIdAndUpdate(id, kata);
  } catch (error) {
    LogError(`[ORM ERROR] Updating Kata by ID: ${error}`);
  }
};
