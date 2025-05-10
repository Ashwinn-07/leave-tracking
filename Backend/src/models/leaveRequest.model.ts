import mongoose, { Schema, Types } from "mongoose";

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface ILeaveRequest {
  _id?: string;
  userId: Types.ObjectId;
  leaveTypeId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  halfDay?: boolean;
  status: LeaveStatus;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const leaveRequestSchema = new Schema<ILeaveRequest>(
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
