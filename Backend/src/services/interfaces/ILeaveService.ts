import { ILeaveRequest } from "../../models/leaveRequest.model";

export interface ILeaveService {
  requestLeave(
    userId: string,
    data: {
      leaveTypeId: string;
      startDate: Date;
      endDate: Date;
      halfDay?: boolean;
      comments?: string;
    }
  ): Promise<{ message: string; status: number; data: ILeaveRequest }>;

  getMyLeaves(
    userId: string
  ): Promise<{ message: string; status: number; data: ILeaveRequest[] }>;
  cancelLeave(
    userId: string,
    requestId: string
  ): Promise<{ message: string; status: number }>;
  listPendingLeaves(): Promise<{
    message: string;
    status: number;
    data: ILeaveRequest[];
  }>;
  updateLeaveStatus(
    id: string,
    status: string,
    comments?: string
  ): Promise<{ message: string; status: number }>;
}
