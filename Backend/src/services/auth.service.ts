import { injectable, inject } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { IAuthService } from "./interfaces/IAuthService";
import { IUser } from "../models/user.model";
import { TOKENS } from "../config/tokens";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TOKENS.IAuthRepository) private authRepo: IAuthRepository
  ) {}
  private sanitizeUser(user: IUser) {
    const { password, __v, ...sanitizedUser } = user.toObject();
    return sanitizedUser;
  }
  async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string; message: string; status: number }> {
    if (!email) {
      throw new Error(MESSAGES.ERROR.EMAIL_REQUIRED);
    }
    if (!password) {
      throw new Error(MESSAGES.ERROR.PASSWORD_REQUIRED);
    }
    const user = await this.authRepo.findByEmail(email);
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error(MESSAGES.ERROR.JWT_SECRET_MISSING);
    }
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });
    const sanitizedUser = this.sanitizeUser(user);
    return {
      user: sanitizedUser,
      token,
      message: MESSAGES.SUCCESS.LOGIN,
      status: STATUS_CODES.OK,
    };
  }
}
