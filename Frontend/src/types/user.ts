export type UserRole = "employee" | "manager" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}
