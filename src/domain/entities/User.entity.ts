import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";

export const userEntity = () => {
  /* const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
  }); */

  const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
  });

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
