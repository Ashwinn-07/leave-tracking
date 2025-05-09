import { IUser } from "../../models/user.model";

export interface IAuthService {
  login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string; message: string; status: number }>;
}
