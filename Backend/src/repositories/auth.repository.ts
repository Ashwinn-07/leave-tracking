import { injectable } from "tsyringe";
import User from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { IUser } from "../models/user.model";

@injectable()
export class AuthRepository
  extends BaseRepository<IUser>
  implements IAuthRepository
{
  constructor() {
    super(User);
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }
}
