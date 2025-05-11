import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IHolidayService } from "../services/interfaces/IHolidayService";
import { IHolidayController } from "./interfaces/IHolidayController";
import { TOKENS } from "../config/tokens";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class HolidayController implements IHolidayController {
  constructor(
    @inject(TOKENS.IHolidayService) private holidayService: IHolidayService
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { name, date } = req.body;
      const result = await this.holidayService.createHoliday({
        name,
        date: new Date(date),
      });
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to create holiday",
      });
    }
  };

  list = async (_: Request, res: Response) => {
    try {
      const result = await this.holidayService.listHolidays();
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to fetch holidays",
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, date } = req.body;
      const result = await this.holidayService.updateHoliday(id, {
        name,
        date: date ? new Date(date) : undefined,
      });
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to update holiday",
      });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.holidayService.deleteHoliday(id);
      res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        error:
          error instanceof Error ? error.message : "Failed to remove holiday",
      });
    }
  };
}
