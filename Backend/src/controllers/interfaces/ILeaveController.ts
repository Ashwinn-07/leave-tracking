import { Request, Response } from "express";

export interface ILeaveController {
  requestLeave(req: Request, res: Response): Promise<void>;
  getMyLeaves(req: Request, res: Response): Promise<void>;
  cancelLeave(req: Request, res: Response): Promise<void>;
}
