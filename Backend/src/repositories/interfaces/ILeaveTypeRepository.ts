import { ILeaveType } from "../../models/leaveType.model";

export interface ILeaveTypeRepository {
  create(data: Partial<ILeaveType>): Promise<ILeaveType>;
  findAll(): Promise<ILeaveType[]>;
  findById(id: string): Promise<ILeaveType | null>;
}
