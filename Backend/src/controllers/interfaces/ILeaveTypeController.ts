import { Request, Response } from "express";

export interface ILeaveTypeController {
  createType(req: Request, res: Response): Promise<void>;
  listTypes(req: Request, res: Response): Promise<void>;
}
