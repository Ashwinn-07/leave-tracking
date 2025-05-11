import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IAttendanceService } from "../services/interfaces/IAttendanceService";
import { IAttendanceController } from "./interfaces/IAttendanceController";
import { TOKENS } from "../config/tokens";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class AttendanceController implements IAttendanceController {
  constructor(
    @inject(TOKENS.IAttendanceService)
    private attendanceService: IAttendanceService
  ) {}

  clockIn = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const result = await this.attendanceService.clockIn(userId);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error: error instanceof Error ? error.message : "Failed to clock in",
      });
    }
  };

  clockOut = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const result = await this.attendanceService.clockOut(userId);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error: error instanceof Error ? error.message : "Failed to clock out",
      });
    }
  };

  getMyAttendance = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const result = await this.attendanceService.getMyAttendance(userId);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to fetch attendance",
      });
    }
  };

  getPending = async (_: Request, res: Response) => {
    try {
      const result = await this.attendanceService.getPendingEdits();
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to get pendings",
      });
    }
  };

  approve = async (req: Request, res: Response) => {
    try {
      const { id, status, comments } = req.body;
      const result = await this.attendanceService.approveEdit(
        id,
        status,
        comments
      );
      res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to update status",
      });
    }
  };
}
