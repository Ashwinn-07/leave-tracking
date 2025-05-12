import { Router } from "express";
import { container } from "tsyringe";
import { AttendanceController } from "../controllers/attendance.controller";
import { LeaveController } from "../controllers/leave.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";

const managerRoutes = Router();
const managerAuth = authMiddleware([ROLES.MANAGER]);

const attendanceController = container.resolve(AttendanceController);
const leaveController = container.resolve(LeaveController);

managerRoutes
  .get("/attendance/pending", managerAuth, attendanceController.getPending)
  .post("/attendance/approve", managerAuth, attendanceController.approve)

  .get("/leave/pending", managerAuth, leaveController.listPending)
  .post("/leave/approve", managerAuth, leaveController.approve);

export default managerRoutes;
