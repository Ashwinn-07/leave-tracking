import { injectable } from "tsyringe";
import Holiday, { IHoliday } from "../models/holiday.model";
import { IHolidayRepository } from "./interfaces/IHolidayRepository";
import { BaseRepository } from "./base.repository";

@injectable()
export class HolidayRepository
  extends BaseRepository<IHoliday>
  implements IHolidayRepository
{
  constructor() {
    super(Holiday);
  }

  findAll(): Promise<IHoliday[]> {
    return this.model.find().sort({ date: 1 }).exec();
  }

  async update(id: string, data: Partial<IHoliday>): Promise<IHoliday | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
