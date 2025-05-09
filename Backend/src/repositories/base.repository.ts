import { Model, Document } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: Partial<Record<keyof T, any>>): Promise<T | null> {
    return this.model.findOne(filter as any).exec();
  }
}
