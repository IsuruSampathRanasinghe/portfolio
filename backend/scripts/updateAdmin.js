import "dotenv/config";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const updateAdmin = async () => {
  try {
    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
    } = process.env;

    if (
      !ADMIN_EMAIL ||
      !ADMIN_PASSWORD
    ) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD are required."
      );
    }

    if (
      ADMIN_PASSWORD.length < 8
    ) {
      throw new Error(
        "ADMIN_PASSWORD must contain at least 8 characters."
      );
    }

    const newEmail =
      ADMIN_EMAIL
        .trim()
        .toLowerCase();

    await connectDB();

    // Your portfolio has one admin account,
    // so get the existing admin record.
    const admin =
      await Admin.findOne();

    if (!admin) {
      throw new Error(
        "Admin account not found."
      );
    }

    // Check whether another admin already
    // uses the new email.
    const emailOwner =
      await Admin.findOne({
        email: newEmail,
        _id: {
          $ne: admin._id,
        },
      });

    if (emailOwner) {
      throw new Error(
        "Another admin account already uses this email."
      );
    }

    if (ADMIN_NAME) {
      admin.name =
        ADMIN_NAME.trim();
    }

    admin.email =
      newEmail;

    // Important:
    // Do NOT hash the password here.
    // Admin.js pre("save") will hash it.
    admin.password =
      ADMIN_PASSWORD;

    await admin.save();

    console.log(
      "Admin credentials updated successfully."
    );

    console.log(
      `Admin email: ${admin.email}`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      `Unable to update admin: ${error.message}`
    );

    process.exit(1);
  }
};

updateAdmin();