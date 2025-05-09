import mongoose, { Schema, Document } from "mongoose";
import { ROLES } from "../utils/constants";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: ROLES;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
