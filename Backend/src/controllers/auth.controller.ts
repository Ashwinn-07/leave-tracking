import { Request, Response } from "express";
import { IAuthController } from "./interfaces/IAuthController";
import { inject, injectable } from "tsyringe";
import { IAuthService } from "../services/interfaces/IAuthService";
import { TOKENS } from "../config/tokens";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TOKENS.IAuthService) private authService: IAuthService) {}
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });
      res.status(result.status).json({
        message: result.message,
        user: result.user,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error: error instanceof Error ? error.message : "Login Failed",
      });
    }
  };
}
