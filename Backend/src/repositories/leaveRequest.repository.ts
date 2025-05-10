import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import LeaveRequest, { ILeaveRequest } from "../models/leaveRequest.model";
import { ILeaveRequestRepository } from "./interfaces/ILeaveRequestRepository";

@injectable()
export class LeaveRequestRepository
  extends BaseRepository<ILeaveRequest>
  implements ILeaveRequestRepository
{
  constructor() {
    super(LeaveRequest);
  }

  findByUser(userId: string) {
    return this.model.find({ userId }).exec();
  }

  async updateStatus(id: string, status: string) {
    await this.model.findByIdAndUpdate(id, { status }).exec();
  }
}
