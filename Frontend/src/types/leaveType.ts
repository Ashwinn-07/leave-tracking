export interface ILeaveType {
  _id: string;
  name: string;
  description?: string;
  maxDays: number;
  accrualRate: number;
  halfDayAllowed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
