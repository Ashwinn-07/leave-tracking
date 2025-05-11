import { injectable, inject } from "tsyringe";
import { ILeaveRequest } from "../models/leaveRequest.model";
import { ILeaveRequestRepository } from "../repositories/interfaces/ILeaveRequestRepository";
import { ILeaveService } from "./interfaces/ILeaveService";
import { TOKENS } from "../config/tokens";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { ILeaveTypeRepository } from "../repositories/interfaces/ILeaveTypeRepository";
import mongoose from "mongoose";
import { IHolidayRepository } from "../repositories/interfaces/IHolidayRepository";

@injectable()
export class LeaveService implements ILeaveService {
  constructor(
    @inject(TOKENS.ILeaveRequestRepository)
    private leaveRepo: ILeaveRequestRepository,
    @inject(TOKENS.ILeaveTypeRepository)
    private leaveTypeRepo: ILeaveTypeRepository,
    @inject(TOKENS.IHolidayRepository)
    private holidayRepo: IHolidayRepository
  ) {}
  private async calculateWorkingDays(
    start: Date,
    end: Date,
    halfDay: boolean
  ): Promise<number> {
    let count = 0;
    const current = new Date(start);
    const endDate = new Date(end);

    const holidays = await this.holidayRepo.findBetweenDates(start, end);
    const holidayDates = new Set(
      holidays.map((h) => h.date.toISOString().split("T")[0])
    );

    while (current <= endDate) {
      const day = current.getDay();
      const dateString = current.toISOString().split("T")[0];

      if (day !== 0 && day !== 6 && !holidayDates.has(dateString)) {
        count++;
      }

      current.setDate(current.getDate() + 1);
    }

    if (halfDay) {
      return count > 0 ? 0.5 : 0;
    }

    return count;
  }

  async requestLeave(
    userId: string,
    data: {
      leaveTypeId: string;
      startDate: Date;
      endDate: Date;
      halfDay?: boolean;
      comments?: string;
    }
  ): Promise<{ message: string; status: number; data: ILeaveRequest }> {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error(MESSAGES.ERROR.INVALID_DATE_FORMAT);
    }
    if (startDate > endDate) {
      throw new Error(MESSAGES.ERROR.START_AFTER_END_DATE);
    }

    if (startDate < new Date()) {
      throw new Error(MESSAGES.ERROR.PAST_DATE_SELECTION);
    }

    const leaveType = await this.leaveTypeRepo.findById(data.leaveTypeId);
    if (!leaveType) {
      throw new Error(MESSAGES.ERROR.LEAVETYPE_NOT_FOUND);
    }

    if (data.halfDay && !leaveType.halfDayAllowed) {
      throw new Error(MESSAGES.ERROR.HALFDAY_NOT_ALLOWED);
    }

    const requestedDays = data.halfDay
      ? 0.5
      : Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        ) + 1;

    const existingLeaves = await this.leaveRepo.findByUser(userId);
    const overlapping = existingLeaves.some(
      (leave) =>
        startDate <= leave.endDate &&
        endDate >= leave.startDate &&
        ["pending", "approved"].includes(leave.status)
    );

    if (overlapping) {
      throw new Error(MESSAGES.ERROR.OVERLAPPING_LEAVE);
    }

    const currentDate = new Date();
    const monthsElapsed = currentDate.getMonth() + 1;
    const accruedDays = Math.min(
      leaveType.accrualRate * monthsElapsed,
      leaveType.maxDays
    );

    const currentYear = currentDate.getFullYear();
    const usedDays = await this.leaveRepo.getUsedDaysByUserAndLeaveType(
      userId,
      data.leaveTypeId,
      currentYear
    );
    if (accruedDays - usedDays < requestedDays) {
      throw new Error(MESSAGES.ERROR.INSUFFICIENT_LEAVE_BALANCE);
    }
    const days = await this.calculateWorkingDays(
      startDate,
      endDate,
      data.halfDay || false
    );

    if (days <= 0) {
      throw new Error(MESSAGES.ERROR.NO_WORKING_DAYS);
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const leaveTypeObjectId = new mongoose.Types.ObjectId(data.leaveTypeId);

    const leave = await this.leaveRepo.create({
      userId: userObjectId,
      leaveTypeId: leaveTypeObjectId,
      startDate: data.startDate,
      endDate: data.endDate,
      halfDay: data.halfDay,
      comments: data.comments,
      status: "pending",
    });
    if (!leave) {
      throw new Error(MESSAGES.ERROR.CREATE_LEAVE_FAILED);
    }
    return {
      data: leave,
      message: MESSAGES.SUCCESS.LEAVE_REQUEST_CREATED,
      status: STATUS_CODES.CREATED,
    };
  }

  async getMyLeaves(
    userId: string
  ): Promise<{ message: string; status: number; data: ILeaveRequest[] }> {
    const leaves = await this.leaveRepo.findByUser(userId);

    return {
      message: MESSAGES.SUCCESS.LEAVES_FETCHED,
      status: STATUS_CODES.OK,
      data: leaves,
    };
  }

  async cancelLeave(
    userId: string,
    requestId: string
  ): Promise<{ message: string; status: number }> {
    const leave = await this.leaveRepo.findById(requestId);
    if (!leave) {
      throw new Error(MESSAGES.ERROR.LEAVE_NOT_FOUND);
    }

    if (leave.userId.toString() !== userId) {
      throw new Error(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
    }

    if (leave.status !== "pending") {
      throw new Error(MESSAGES.ERROR.CANCEL_NON_PENDING);
    }

    if (new Date(leave.startDate) < new Date()) {
      throw new Error(MESSAGES.ERROR.CANCEL_STARTED_LEAVE);
    }
    await this.leaveRepo.updateStatus(requestId, "cancelled");

    return {
      message: MESSAGES.SUCCESS.LEAVE_STATUS_UPDATED,
      status: STATUS_CODES.OK,
    };
  }
  async listPendingLeaves(): Promise<{
    message: string;
    status: number;
    data: ILeaveRequest[];
  }> {
    const pendingLeaves = await this.leaveRepo.findByStatus("pending");
    return {
      message: MESSAGES.SUCCESS.PENDING_LEAVES_FETCHED,
      status: STATUS_CODES.OK,
      data: pendingLeaves,
    };
  }
  async updateLeaveStatus(
    id: string,
    status: "approved" | "rejected",
    comments?: string
  ): Promise<{ message: string; status: number }> {
    await this.leaveRepo.updateLeaveStatus(id, status, comments);
    return {
      message: MESSAGES.SUCCESS.STATUS_UPDATE_SUCCESS,
      status: STATUS_CODES.OK,
    };
  }
}
