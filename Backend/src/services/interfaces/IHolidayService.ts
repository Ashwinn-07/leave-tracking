import { IHoliday } from "../../models/holiday.model";

export interface IHolidayService {
  createHoliday(data: {
    name: string;
    date: Date;
  }): Promise<{ message: string; status: number; data: IHoliday }>;
  listHolidays(): Promise<{
    message: string;
    status: number;
    data: IHoliday[];
  }>;
  updateHoliday(
    id: string,
    data: { name?: string; date?: Date }
  ): Promise<{ message: string; status: number; data: IHoliday }>;
  deleteHoliday(id: string): Promise<{ message: string; status: number }>;
}
