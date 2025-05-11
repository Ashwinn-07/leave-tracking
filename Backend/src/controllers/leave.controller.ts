import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { ILeaveService } from "../services/interfaces/ILeaveService";
import { TOKENS } from "../config/tokens";
import { STATUS_CODES } from "../utils/constants";
import { ILeaveController } from "./interfaces/ILeaveController";

@injectable()
export class LeaveController implements ILeaveController {
  constructor(
    @inject(TOKENS.ILeaveService)
    private leaveService: ILeaveService
  ) {}

  requestLeave = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { leaveTypeId, startDate, endDate, halfDay, comments } = req.body;
      const result = await this.leaveService.requestLeave(userId, {
        leaveTypeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        halfDay,
        comments,
      });
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to create leave request",
      });
    }
  };

  getMyLeaves = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const result = await this.leaveService.getMyLeaves(userId);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to fetch leaves",
      });
    }
  };

  cancelLeave = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const { requestId } = req.body;
      const result = await this.leaveService.cancelLeave(userId, requestId);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to cancel leave request",
      });
    }
  };
  listPending = async (req: Request, res: Response) => {
    try {
      const result = await this.leaveService.listPendingLeaves();
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch pending leave requests",
      });
    }
  };
  approve = async (req: Request, res: Response) => {
    try {
      const { requestId, status, comments } = req.body;
      const result = await this.leaveService.updateLeaveStatus(
        requestId,
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
