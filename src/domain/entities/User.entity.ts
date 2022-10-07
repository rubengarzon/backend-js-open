import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";

export const userEntity = () => {
  const userSchema = new mongoose.Schema<IUser>({
    rol: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    katas: { type: [], required: true },
  });

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
