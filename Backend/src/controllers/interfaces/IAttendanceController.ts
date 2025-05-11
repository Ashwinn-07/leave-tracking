import { Request, Response } from "express";

export interface IAttendanceController {
  clockIn(req: Request, res: Response): Promise<void>;
  clockOut(req: Request, res: Response): Promise<void>;
  getMyAttendance(req: Request, res: Response): Promise<void>;
  getPending(req: Request, res: Response): Promise<void>;
  approve(req: Request, res: Response): Promise<void>;
}
