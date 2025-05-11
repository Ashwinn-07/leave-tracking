import { ILeaveType } from "../../models/leaveType.model";
import { IBaseRepository } from "./IBaseRepository";

export interface ILeaveTypeRepository extends IBaseRepository<ILeaveType> {
  create(data: Partial<ILeaveType>): Promise<ILeaveType>;
  findAll(): Promise<ILeaveType[]>;
  findById(id: string): Promise<ILeaveType | null>;
}
