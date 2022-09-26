import { IKata } from "./IKata.interface";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  katas: IKata[];
}
