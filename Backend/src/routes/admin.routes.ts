import { Router } from "express";
import { container } from "tsyringe";
import { LeaveTypeController } from "../controllers/leaveType.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";

const adminRoutes = Router();
const adminAuth = authMiddleware([ROLES.ADMIN]);
const leaveTypeController = container.resolve(LeaveTypeController);

adminRoutes.post("/leave-type", adminAuth, leaveTypeController.createType);
adminRoutes.get("/leave-types", leaveTypeController.listTypes);

export default adminRoutes;
