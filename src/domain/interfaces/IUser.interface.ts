import { IKata } from "./IKata.interface";

export interface IUser {
  rol: string;
  name: string;
  email: string;
  password: string;
  age: number;
  katas: IKata[];
}
