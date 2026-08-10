import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const protect = asyncHandler(
  async (req, res, next) => {
    // Make sure JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      throw new ApiError(
        500,
        "Authentication configuration error."
      );
    }

    const authHeader =
      req.headers.authorization;

    // Check Authorization header
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(
        401,
        "Not authorized. No token provided."
      );
    }

    // Extract token
    const token = authHeader
      .slice(7)
      .trim();

    if (!token) {
      throw new ApiError(
        401,
        "Not authorized. No token provided."
      );
    }

    let decoded;

    try {
      // Verify token and only allow HS256
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        {
          algorithms: ["HS256"],
        }
      );
    } catch (error) {
      if (
        error.name ===
        "TokenExpiredError"
      ) {
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

    // Make sure token contains an admin ID
    if (!decoded?.id) {
      throw new ApiError(
        401,
        "Invalid authentication token."
      );
    }

    // Verify that the admin still exists
    const admin =
      await Admin.findById(
        decoded.id
      ).select("-password");

    if (!admin) {
      throw new ApiError(
        401,
        "Admin account not found."
      );
    }

    // Attach authenticated admin
    req.admin = admin;

    next();
  }
);