import { Document } from "mongoose";

export interface IBaseRepository<T extends Document> {
  create(item: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: Partial<Record<keyof T, any>>): Promise<T | null>;
}
