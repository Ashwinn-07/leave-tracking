import { ILeaveRequest } from "../../models/leaveRequest.model";

export interface ILeaveRequestRepository {
  create(data: Partial<ILeaveRequest>): Promise<ILeaveRequest>;
  findByUser(userId: string): Promise<ILeaveRequest[]>;
  findById(id: string): Promise<ILeaveRequest | null>;
  updateStatus(id: string, status: string): Promise<void>;
}
