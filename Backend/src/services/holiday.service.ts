import { injectable, inject } from "tsyringe";
import { IHolidayRepository } from "../repositories/interfaces/IHolidayRepository";
import { IHolidayService } from "./interfaces/IHolidayService";
import { IHoliday } from "../models/holiday.model";
import { TOKENS } from "../config/tokens";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

@injectable()
export class HolidayService implements IHolidayService {
  constructor(
    @inject(TOKENS.IHolidayRepository) private holidayRepo: IHolidayRepository
  ) {}
  private async validateHolidayDate(date: Date): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const holidayDate = new Date(date);
    holidayDate.setHours(0, 0, 0, 0);

    if (holidayDate < today) {
      throw new Error(MESSAGES.ERROR.PAST_HOLIDAY_DATE);
    }

    const existing = await this.holidayRepo.findByDate(holidayDate);
    if (existing) {
      throw new Error(MESSAGES.ERROR.DUPLICATE_HOLIDAY_DATE);
    }
  }

  async createHoliday(data: {
    name: string;
    date: Date;
  }): Promise<{ message: string; status: number; data: IHoliday }> {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error(MESSAGES.ERROR.INVALID_HOLIDAY_NAME);
    }
    if (isNaN(new Date(data.date).getTime())) {
      throw new Error(MESSAGES.ERROR.INVALID_HOLIDAY_DATE);
    }

    await this.validateHolidayDate(data.date);
    const holiday = await this.holidayRepo.create(data);
    return {
      message: MESSAGES.SUCCESS.HOLIDAY_CREATE_SUCCESS,
      status: STATUS_CODES.OK,
      data: holiday,
    };
  }

  async listHolidays(): Promise<{
    message: string;
    status: number;
    data: IHoliday[];
  }> {
    const holidays = await this.holidayRepo.findAll();
    return {
      message: MESSAGES.SUCCESS.HOLIDAYS_FETCH_SUCCESS,
      status: STATUS_CODES.OK,
      data: holidays,
    };
  }

  async updateHoliday(
    id: string,
    data: { name?: string; date?: Date }
  ): Promise<{ message: string; status: number; data: IHoliday }> {
    if (data.name && data.name.trim().length < 3) {
      throw new Error(MESSAGES.ERROR.INVALID_HOLIDAY_NAME);
    }
    if (data.date) {
      if (isNaN(new Date(data.date).getTime())) {
        throw new Error(MESSAGES.ERROR.INVALID_HOLIDAY_DATE);
      }
      await this.validateHolidayDate(data.date);
    }
    const updated = await this.holidayRepo.update(id, data);
    if (!updated) throw new Error(MESSAGES.ERROR.HOLIDAY_NOT_FOUND);
    return {
      message: MESSAGES.SUCCESS.HOLIDAY_UPDATE_SUCCESS,
      status: STATUS_CODES.OK,
      data: updated,
    };
  }

  async deleteHoliday(
    id: string
  ): Promise<{ message: string; status: number }> {
    await this.holidayRepo.delete(id);
    return {
      message: MESSAGES.SUCCESS.HOLIDAY_DELETE_SUCCESS,
      status: STATUS_CODES.OK,
    };
  }
}
