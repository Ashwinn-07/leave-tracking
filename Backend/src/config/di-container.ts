import { container } from "tsyringe";
import { TOKENS } from "./tokens";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repositories/auth.repository";
import { IAuthService } from "../services/interfaces/IAuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { LeaveService } from "../services/leave.service";
import { ILeaveService } from "../services/interfaces/ILeaveService";
import { LeaveRequestRepository } from "../repositories/leaveRequest.repository";
import { ILeaveRequestRepository } from "../repositories/interfaces/ILeaveRequestRepository";
import { ILeaveTypeRepository } from "../repositories/interfaces/ILeaveTypeRepository";
import { LeaveTypeRepository } from "../repositories/leaveType.repository";
import { ILeaveTypeService } from "../services/interfaces/ILeaveTypeService";
import { LeaveTypeService } from "../services/leaveType.service";
import { IAttendanceRepository } from "../repositories/interfaces/IAttendanceRepository";
import { AttendanceRepository } from "../repositories/attendance.repository";
import { IAttendanceService } from "../services/interfaces/IAttendanceService";
import { AttendanceService } from "../services/attendance.service";
//controllers
import { AuthController } from "../controllers/auth.controller";
import { LeaveController } from "../controllers/leave.controller";
import { LeaveTypeController } from "../controllers/leaveType.controller";
import { AttendanceController } from "../controllers/attendance.controller";

container.register<IAuthService>(TOKENS.IAuthService, {
  useClass: AuthService,
});

container.register<IAuthRepository>(TOKENS.IAuthRepository, {
  useClass: AuthRepository,
});

container.register<ILeaveService>(TOKENS.ILeaveService, {
  useClass: LeaveService,
});

container.register<ILeaveRequestRepository>(TOKENS.ILeaveRequestRepository, {
  useClass: LeaveRequestRepository,
});

container.register<ILeaveTypeService>(TOKENS.ILeaveTypeService, {
  useClass: LeaveTypeService,
});

container.register<ILeaveTypeRepository>(TOKENS.ILeaveTypeRepository, {
  useClass: LeaveTypeRepository,
});
container.register<IAttendanceService>(TOKENS.IAttendanceService, {
  useClass: AttendanceService,
});

container.register<IAttendanceRepository>(TOKENS.IAttendanceRepository, {
  useClass: AttendanceRepository,
});

//controllers
container.register<AuthController>(AuthController, {
  useClass: AuthController,
});
container.register<LeaveController>(LeaveController, {
  useClass: LeaveController,
});
container.register<LeaveTypeController>(LeaveTypeController, {
  useClass: LeaveTypeController,
});
container.register<AttendanceController>(AttendanceController, {
  useClass: AttendanceController,
});
