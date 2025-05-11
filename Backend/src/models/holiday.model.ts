import mongoose, { Schema, Document } from "mongoose";

export interface IHoliday extends Document {
  _id: string;
  name: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const holidaySchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
  },
  { timestamps: true }
);

const Holiday = mongoose.model<IHoliday>("Holiday", holidaySchema);
export default Holiday;
