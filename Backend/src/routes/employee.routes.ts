import { Router } from "express";
import { container } from "tsyringe";
import { LeaveController } from "../controllers/leave.controller";
import { AttendanceController } from "../controllers/attendance.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";

const employeeRoutes = Router();
const employeeAuth = authMiddleware([ROLES.EMPLOYEE]);
const leaveController = container.resolve(LeaveController);
const attendanceController = container.resolve(AttendanceController);

employeeRoutes.post("/request", employeeAuth, leaveController.requestLeave);
employeeRoutes.get("/status", employeeAuth, leaveController.getMyLeaves);
employeeRoutes.post("/cancel", employeeAuth, leaveController.cancelLeave);

employeeRoutes.post("/clock-in", employeeAuth, attendanceController.clockIn);
employeeRoutes.post("/clock-out", employeeAuth, attendanceController.clockOut);
employeeRoutes.get("/my", employeeAuth, attendanceController.getMyAttendance);

export default employeeRoutes;
