import { Router } from "express";
import { container } from "tsyringe";
import { LeaveController } from "../controllers/leave.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";

const employeeRoutes = Router();
const employeeAuth = authMiddleware([ROLES.EMPLOYEE]);
const leaveController = container.resolve(LeaveController);

employeeRoutes.post("/request", employeeAuth, leaveController.requestLeave);
employeeRoutes.get("/status", employeeAuth, leaveController.getMyLeaves);
employeeRoutes.post("/cancel", employeeAuth, leaveController.cancelLeave);

export default employeeRoutes;
