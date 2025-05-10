import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import LeaveType, { ILeaveType } from "../models/leaveType.model";
import { ILeaveTypeRepository } from "./interfaces/ILeaveTypeRepository";

@injectable()
export class LeaveTypeRepository
  extends BaseRepository<ILeaveType>
  implements ILeaveTypeRepository
{
  constructor() {
    super(LeaveType);
  }

  findAll() {
    return this.model.find().exec();
  }
}
