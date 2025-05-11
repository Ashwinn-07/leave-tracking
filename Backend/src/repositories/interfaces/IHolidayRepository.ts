import { IHoliday } from "../../models/holiday.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IHolidayRepository extends IBaseRepository<IHoliday> {
  findAll(): Promise<IHoliday[]>;
  update(id: string, data: Partial<IHoliday>): Promise<IHoliday | null>;
  delete(id: string): Promise<void>;
  findByDate(date: Date): Promise<IHoliday | null>;
  findBetweenDates(start: Date, end: Date): Promise<IHoliday[]>;
}
