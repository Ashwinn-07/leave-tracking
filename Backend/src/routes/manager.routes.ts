import { Router } from "express";
import { container } from "tsyringe";
import { AttendanceController } from "../controllers/attendance.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";

const managerRoutes = Router();
const managerAuth = authMiddleware([ROLES.MANAGER]);
const attendanceController = container.resolve(AttendanceController);

managerRoutes.get(
  "/attendance/pending",
  managerAuth,
  attendanceController.getPending
);
managerRoutes.post(
  "/attendance/approve",
  managerAuth,
  attendanceController.approve
);

export default managerRoutes;
