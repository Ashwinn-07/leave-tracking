import { ILeaveType } from "../../models/leaveType.model";

export interface ILeaveTypeService {
  createType(data: {
    name: string;
    description?: string;
    maxDays: number;
    accrualRate: number;
    halfDayAllowed?: boolean;
  }): Promise<{ message: string; status: number; data: ILeaveType }>;
  listTypes(): Promise<{ message: string; status: number; data: ILeaveType[] }>;
}
