import { IAttendance } from "../../models/attendance.model";

export interface IAttendanceService {
  clockIn(
    userId: string
  ): Promise<{ message: string; status: number; data: IAttendance }>;
  clockOut(
    userId: string
  ): Promise<{ message: string; status: number; data: IAttendance }>;
  getMyAttendance(
    userId: string
  ): Promise<{ message: string; status: number; data: IAttendance[] }>;
  getPendingEdits(): Promise<{
    message: string;
    status: number;
    data: IAttendance[];
  }>;
  approveEdit(
    id: string,
    status: "approved" | "rejected",
    comments?: string
  ): Promise<{ message: string; status: number }>;
}
