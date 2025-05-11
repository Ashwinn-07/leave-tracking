import mongoose, { Schema, Document } from "mongoose";

export type AttendanceStatus = "pending" | "approved" | "rejected";

export interface IAttendance extends Document {
  _id: string;
  userId: string | { _id: string; name: string };
  clockIn: Date;
  clockOut?: Date;
  status: AttendanceStatus;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const attendanceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clockIn: { type: Date, required: true },
    clockOut: { type: Date },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    comments: { type: String },
  },
  { timestamps: true }
);

const Attendance = mongoose.model<IAttendance>("Attendance", attendanceSchema);
export default Attendance;
