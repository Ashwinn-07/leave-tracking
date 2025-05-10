import { injectable, inject } from "tsyringe";
import { ILeaveRequest } from "../models/leaveRequest.model";
import { ILeaveRequestRepository } from "../repositories/interfaces/ILeaveRequestRepository";
import { ILeaveService } from "./interfaces/ILeaveService";
import { TOKENS } from "../config/tokens";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { Types } from "mongoose";
import mongoose from "mongoose";

@injectable()
export class LeaveService implements ILeaveService {
  constructor(
    @inject(TOKENS.ILeaveRequestRepository)
    private leaveRepo: ILeaveRequestRepository
  ) {}

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
    if (
      !leave ||
      leave.userId.toString() !== userId ||
      leave.status !== "pending"
    ) {
      throw new Error(MESSAGES.ERROR.CANCEL_NOT_ALLOWED);
    }
    await this.leaveRepo.updateStatus(requestId, "cancelled");

    return {
      message: MESSAGES.SUCCESS.LEAVE_STATUS_UPDATED,
      status: STATUS_CODES.OK,
    };
  }
}
