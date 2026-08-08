import Admin from "../models/Admin.js";

import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/apiResponse.js";


// POST /api/auth/login
// Public
export const loginAdmin = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      throw new ApiError(
        401,
        "Invalid email or password."
      );
    }

    const passwordMatches =
      await admin.matchPassword(password);

    if (!passwordMatches) {
      throw new ApiError(
        401,
        "Invalid email or password."
      );
    }

    const token = generateToken(admin._id);

    return successResponse(
      res,
      200,
      "Login successful.",
      {
        token,

        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      }
    );
  }
);


// GET /api/auth/profile
// Admin
export const getAdminProfile = asyncHandler(
  async (req, res) => {
    return successResponse(
      res,
      200,
      "Admin profile retrieved successfully.",
      {
        admin: req.admin,
      }
    );
  }
);


// GET /api/auth/check
// Admin
export const checkAuth = asyncHandler(
  async (req, res) => {
    return successResponse(
      res,
      200,
      "Authentication verified.",
      {
        authenticated: true,
        admin: req.admin,
      }
    );
  }
);