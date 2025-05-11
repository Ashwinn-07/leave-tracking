import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import LeaveRequest, { ILeaveRequest } from "../models/leaveRequest.model";
import { ILeaveRequestRepository } from "./interfaces/ILeaveRequestRepository";
import mongoose from "mongoose";

@injectable()
export class LeaveRequestRepository
  extends BaseRepository<ILeaveRequest>
  implements ILeaveRequestRepository
{
  constructor() {
    super(LeaveRequest);
  }

  findByUser(userId: string) {
    return this.model
      .find({ userId })
      .populate("leaveTypeId", "name")
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateStatus(id: string, status: string) {
    await this.model.findByIdAndUpdate(id, { status }).exec();
  }
  async getUsedDaysByUserAndLeaveType(
    userId: string,
    leaveTypeId: string,
    year: number
  ): Promise<number> {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const leaves = await this.model
      .find({
        userId: new mongoose.Types.ObjectId(userId),
        leaveTypeId: new mongoose.Types.ObjectId(leaveTypeId),
        status: "approved",
        startDate: { $gte: startOfYear, $lt: endOfYear },
      })
      .exec();

    return leaves.reduce((total, leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const diffDays =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
      return total + (leave.halfDay ? 0.5 : diffDays);
    }, 0);
  }
}
