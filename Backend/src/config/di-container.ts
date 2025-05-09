import { container } from "tsyringe";
import { TOKENS } from "./tokens";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repositories/auth.repository";
import { IAuthService } from "../services/interfaces/IAuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { AuthController } from "../controllers/auth.controller";

container.register<IAuthService>(TOKENS.IAuthService, {
  useClass: AuthService,
});

container.register<IAuthRepository>(TOKENS.IAuthRepository, {
  useClass: AuthRepository,
});

container.register<AuthController>(AuthController, {
  useClass: AuthController,
});
