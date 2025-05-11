import { injectable, inject } from "tsyringe";
import { IAttendance } from "../models/attendance.model";
import { IAttendanceRepository } from "../repositories/interfaces/IAttendanceRepository";
import { IAttendanceService } from "./interfaces/IAttendanceService";
import { TOKENS } from "../config/tokens";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

@injectable()
export class AttendanceService implements IAttendanceService {
  constructor(
    @inject(TOKENS.IAttendanceRepository)
    private attendanceRepo: IAttendanceRepository
  ) {}

  async clockIn(
    userId: string
  ): Promise<{ message: string; status: number; data: IAttendance }> {
    const clockIn = await this.attendanceRepo.create({
      userId,
      clockIn: new Date(),
      status: "pending",
    });
    return {
      message: MESSAGES.SUCCESS.CLOCK_IN,
      status: STATUS_CODES.OK,
      data: clockIn,
    };
  }

  async clockOut(
    userId: string
  ): Promise<{ message: string; status: number; data: IAttendance }> {
    const today = await this.attendanceRepo.findByUser(userId);
    const latest = today.reverse().find((a) => !a.clockOut);
    if (!latest) {
      throw new Error(MESSAGES.ERROR.CLOCK_IN_UNAVAILABLE);
    }
    latest.clockOut = new Date();
    const clockOut = await this.attendanceRepo.create(latest);
    return {
      message: MESSAGES.SUCCESS.CLOCK_OUT,
      status: STATUS_CODES.OK,
      data: clockOut,
    };
  }

  async getMyAttendance(
    userId: string
  ): Promise<{ message: string; status: number; data: IAttendance[] }> {
    const attendance = await this.attendanceRepo.findByUser(userId);
    if (!attendance) {
      throw new Error(MESSAGES.ERROR.ATTENDANCE_FETCH_FAILED);
    }
    return {
      message: MESSAGES.SUCCESS.ATTENDANCE_FETCHED,
      status: STATUS_CODES.OK,
      data: attendance,
    };
  }

  async getPendingEdits(): Promise<{
    message: string;
    status: number;
    data: IAttendance[];
  }> {
    const pendingEdits = await this.attendanceRepo.findPendingEdits();
    if (!pendingEdits) {
      throw new Error(MESSAGES.ERROR.PENDING_EDITS_FETCH_FAILED);
    }
    const formattedData = pendingEdits.map((record) => ({
      ...record.toObject(),
      employee: {
        name: (record.userId as any)?.name || "Unknown Employee",
      },
    }));
    return {
      message: MESSAGES.SUCCESS.PENDING_EDITS_FETCHED,
      status: STATUS_CODES.OK,
      data: formattedData as unknown as IAttendance[],
    };
  }

  async approveEdit(
    id: string,
    status: "approved" | "rejected",
    comments?: string
  ): Promise<{ message: string; status: number }> {
    await this.attendanceRepo.updateStatus(id, status, comments);
    return {
      message: MESSAGES.SUCCESS.STATUS_UPDATE_SUCCESS,
      status: STATUS_CODES.OK,
    };
  }
}
