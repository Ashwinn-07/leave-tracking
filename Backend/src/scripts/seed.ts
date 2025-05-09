import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "../config/db";
import User from "../models/user.model";
import { ROLES } from "../utils/constants";

async function seed() {
  try {
    await connectDB();

    const rawPassword = "Password123!";

    const hashed = await bcrypt.hash(rawPassword, 10);

    const users = [
      {
        name: "Alice Employee",
        email: "alice@example.com",
        password: hashed,
        role: ROLES.EMPLOYEE,
      },
      {
        name: "Bob Manager",
        email: "bob@example.com",
        password: hashed,
        role: ROLES.MANAGER,
      },
      {
        name: "Carol Admin",
        email: "carol@example.com",
        password: hashed,
        role: ROLES.ADMIN,
      },
    ];

    await User.insertMany(users);
    console.log("Seeded users:");
    users.forEach((u) =>
      console.log(` • ${u.email} / ${rawPassword} → ${u.role}`)
    );
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
