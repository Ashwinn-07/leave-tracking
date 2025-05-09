import { IBaseRepository } from "./IBaseRepository";
import { IUser } from "../../models/user.model";

export interface IAuthRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}
