import { IAttendance } from "../../models/attendance.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IAttendanceRepository extends IBaseRepository<IAttendance> {
  create(entry: Partial<IAttendance>): Promise<IAttendance>;
  findByUser(userId: string): Promise<IAttendance[]>;
  findPendingEdits(): Promise<IAttendance[]>;
  updateStatus(id: string, status: string, comments?: string): Promise<void>;
}
