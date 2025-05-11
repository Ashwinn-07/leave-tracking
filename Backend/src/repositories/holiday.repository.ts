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

  async findByDate(date: Date): Promise<IHoliday | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    return this.model
      .findOne({
        date: {
          $gte: startOfDay,
          $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
        },
      })
      .exec();
  }

  async findBetweenDates(start: Date, end: Date): Promise<IHoliday[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return this.model
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ date: 1 })
      .exec();
  }
}
