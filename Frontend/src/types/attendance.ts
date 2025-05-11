export type AttendanceStatus = "pending" | "approved" | "rejected";

export interface IAttendance {
  _id: string;
  userId: string;
  clockIn: string;
  clockOut?: string;
  status: AttendanceStatus;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
  employee?: {
    _id: string;
    name: string;
  };
}
