export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface ILeaveRequest {
  _id: string;
  userId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  halfDay?: boolean;
  status: LeaveStatus;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}
