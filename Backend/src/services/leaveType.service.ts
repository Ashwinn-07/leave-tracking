import { injectable, inject } from "tsyringe";
import { ILeaveTypeRepository } from "../repositories/interfaces/ILeaveTypeRepository";
import { ILeaveTypeService } from "./interfaces/ILeaveTypeService";
import { ILeaveType } from "../models/leaveType.model";
import { TOKENS } from "../config/tokens";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

@injectable()
export class LeaveTypeService implements ILeaveTypeService {
  constructor(
    @inject(TOKENS.ILeaveTypeRepository)
    private leaveTypeRepo: ILeaveTypeRepository
  ) {}

  async createType(data: {
    name: string;
    description?: string;
    maxDays: number;
    accrualRate: number;
    halfDayAllowed?: boolean;
  }): Promise<{ message: string; status: number; data: ILeaveType }> {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error(MESSAGES.ERROR.INVALID_LEAVETYPE_NAME);
    }

    if (typeof data.maxDays !== "number" || data.maxDays <= 0) {
      throw new Error(MESSAGES.ERROR.INVALID_MAX_DAYS);
    }

    if (typeof data.accrualRate !== "number" || data.accrualRate <= 0) {
      throw new Error(MESSAGES.ERROR.INVALID_ACCRUAL_RATE);
    }

    const type = await this.leaveTypeRepo.create(data);
    if (!type) {
      throw new Error(MESSAGES.ERROR.CREATE_LEAVETYPE_FAILED);
    }
    return {
      message: MESSAGES.SUCCESS.LEAVE_TYPE_CREATED,
      status: STATUS_CODES.CREATED,
      data: type,
    };
  }
  async listTypes(): Promise<{
    message: string;
    status: number;
    data: ILeaveType[];
  }> {
    const types = await this.leaveTypeRepo.findAll();
    if (!types) {
      throw new Error(MESSAGES.ERROR.FETCH_LEAVETYPE_FAILED);
    }
    return {
      message: MESSAGES.SUCCESS.LEAVETYPES_FETCHED,
      status: STATUS_CODES.OK,
      data: types,
    };
  }
}
