import mongoose, { Schema, Types, Document } from "mongoose";

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface ILeaveRequest extends Document {
  _id: string;
  userId: Types.ObjectId;
  leaveTypeId: Types.ObjectId | { _id: Types.ObjectId; name: string };
  startDate: Date;
  endDate: Date;
  halfDay?: boolean;
  status: LeaveStatus;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const leaveRequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    leaveTypeId: {
      type: Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    halfDay: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },
    comments: { type: String },
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.model<ILeaveRequest>(
  "LeaveRequest",
  leaveRequestSchema
);
export default LeaveRequest;
