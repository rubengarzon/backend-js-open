import { IKata } from "./../interfaces/IKata.interface";
import mongoose from "mongoose";

export const kataEntity = () => {
  const kataSchema = new mongoose.Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    stars: { type: Number, required: true },
    creator: { type: String, required: true },
    solution: { type: String, required: true },
    participants: { type: [String], required: true },
  });

  return mongoose.models.katas || mongoose.model<IKata>("katas", kataSchema);
};
