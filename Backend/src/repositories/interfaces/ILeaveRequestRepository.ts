import { ILeaveRequest } from "../../models/leaveRequest.model";
import { IBaseRepository } from "./IBaseRepository";

export interface ILeaveRequestRepository
  extends IBaseRepository<ILeaveRequest> {
  create(data: Partial<ILeaveRequest>): Promise<ILeaveRequest>;
  findByUser(userId: string): Promise<ILeaveRequest[]>;
  findById(id: string): Promise<ILeaveRequest | null>;
  updateStatus(id: string, status: string): Promise<void>;
  updateLeaveStatus(
    id: string,
    status: string,
    comments?: string
  ): Promise<void>;
  getUsedDaysByUserAndLeaveType(
    userId: string,
    leaveTypeId: string,
    year: number
  ): Promise<number>;
  findByStatus(status: string): Promise<ILeaveRequest[]>;
}
