import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const protect = asyncHandler(
  async (req, res, next) => {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(
        401,
        "Not authorized. No token provided."
      );
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(
        401,
        "Not authorized. No token provided."
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new ApiError(
          401,
          "Authentication token has expired."
        );
      }

      throw new ApiError(
        401,
        "Invalid authentication token."
      );
    }

    const admin = await Admin.findById(
      decoded.id
    ).select("-password");

    if (!admin) {
      throw new ApiError(
        401,
        "Admin account not found."
      );
    }

    req.admin = admin;

    next();
  }
);