import mongoose, { Schema, Document } from "mongoose";

export interface ILeaveType extends Document {
  _id: string;
  name: string;
  description?: string;
  maxDays: number;
  accrualRate: number;
  halfDayAllowed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const leaveTypeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    maxDays: { type: Number, required: true },
    accrualRate: { type: Number, required: true },
    halfDayAllowed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const LeaveType = mongoose.model<ILeaveType>("LeaveType", leaveTypeSchema);
export default LeaveType;
