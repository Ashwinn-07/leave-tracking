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

employeeRoutes
  .post("/request", employeeAuth, leaveController.requestLeave)
  .get("/status", employeeAuth, leaveController.getMyLeaves)
  .post("/cancel", employeeAuth, leaveController.cancelLeave)

  .post("/clock-in", employeeAuth, attendanceController.clockIn)
  .post("/clock-out", employeeAuth, attendanceController.clockOut)
  .get("/my", employeeAuth, attendanceController.getMyAttendance);

export default employeeRoutes;
