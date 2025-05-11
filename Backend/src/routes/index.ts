import { Router } from "express";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import adminRoutes from "./admin.routes";
import managerRoutes from "./manager.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);
router.use("/admin", adminRoutes);
router.use("/manager", managerRoutes);

export default router;
