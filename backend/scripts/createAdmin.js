import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
    } = process.env;

    if (
      !ADMIN_NAME ||
      !ADMIN_EMAIL ||
      !ADMIN_PASSWORD
    ) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required."
      );
    }

    if (
      ADMIN_PASSWORD.length < 8
    ) {
      throw new Error(
        "ADMIN_PASSWORD must contain at least 8 characters."
      );
    }

    const adminEmail =
      ADMIN_EMAIL
        .trim()
        .toLowerCase();

    await connectDB();

    const existingAdmin =
      await Admin.findOne({
        email: adminEmail,
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists."
      );

      process.exit(0);
    }

    await Admin.create({
      name:
        ADMIN_NAME.trim(),

      email:
        adminEmail,

      password:
        ADMIN_PASSWORD,
    });

    console.log(
      "Admin created successfully."
    );

    process.exit(0);
  } catch (error) {
    console.error(
      `Unable to create admin: ${error.message}`
    );

    process.exit(1);
  }
};

createAdmin();