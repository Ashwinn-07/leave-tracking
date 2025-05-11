import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import Attendance, { IAttendance } from "../models/attendance.model";
import { IAttendanceRepository } from "./interfaces/IAttendanceRepository";

@injectable()
export class AttendanceRepository
  extends BaseRepository<IAttendance>
  implements IAttendanceRepository
{
  constructor() {
    super(Attendance);
  }

  findByUser(userId: string) {
    return this.model.find({ userId }).exec();
  }

  findPendingEdits() {
    return this.model.find({ status: "pending" }).exec();
  }

  async updateStatus(
    id: string,
    status: string,
    comments?: string
  ): Promise<void> {
    await this.model.findByIdAndUpdate(id, { status, comments }).exec();
  }
}
