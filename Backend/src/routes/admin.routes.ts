import { Router } from "express";
import { container } from "tsyringe";
import { LeaveTypeController } from "../controllers/leaveType.controller";
import { HolidayController } from "../controllers/holiday.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";

const adminRoutes = Router();
const adminAuth = authMiddleware([ROLES.ADMIN]);
const leaveTypeController = container.resolve(LeaveTypeController);
const holidayController = container.resolve(HolidayController);

adminRoutes.post("/leave-type", adminAuth, leaveTypeController.createType);
adminRoutes.get("/leave-types", leaveTypeController.listTypes);

adminRoutes.post("/holiday", adminAuth, holidayController.create);
adminRoutes.get("/holiday", holidayController.list);
adminRoutes.put("/holiday/:id", adminAuth, holidayController.update);
adminRoutes.delete("/holiday/:id", adminAuth, holidayController.remove);

export default adminRoutes;
