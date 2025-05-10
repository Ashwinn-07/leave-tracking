import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { ILeaveTypeService } from "../services/interfaces/ILeaveTypeService";
import { TOKENS } from "../config/tokens";
import { ILeaveTypeController } from "./interfaces/ILeaveTypeController";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class LeaveTypeController implements ILeaveTypeController {
  constructor(
    @inject(TOKENS.ILeaveTypeService)
    private leaveTypeService: ILeaveTypeService
  ) {}

  createType = async (req: Request, res: Response) => {
    try {
      const { name, description, maxDays, accrualRate, halfDayAllowed } =
        req.body;
      const result = await this.leaveTypeService.createType({
        name,
        description,
        maxDays,
        accrualRate,
        halfDayAllowed,
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
            : "Failed to create leave type",
      });
    }
  };

  listTypes = async (req: Request, res: Response) => {
    try {
      const result = await this.leaveTypeService.listTypes();
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
            : "Failed to fetch leave types",
      });
    }
  };
}
