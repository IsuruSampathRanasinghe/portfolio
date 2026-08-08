import PortfolioSettings from "../models/PortfolioSettings.js";
import cloudinary from "../config/cloudinary.js";

import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";


// GET /api/settings
// Public
export const getSettings = asyncHandler(
  async (req, res) => {
    const settings =
      await PortfolioSettings.findOne();

    return successResponse(
      res,
      200,
      "Portfolio settings retrieved successfully.",
      {
        settings: settings || null,
      }
    );
  }
);


// PUT /api/settings
// Admin
export const updateSettings = asyncHandler(
  async (req, res) => {
    let settings =
      await PortfolioSettings.findOne();

    if (!settings) {
      settings = new PortfolioSettings({
        name:
          req.body.name ||
          "Portfolio Owner",
      });
    }

    const allowedFields = [
      "name",
      "headline",
      "shortBio",
      "about",
      "email",
      "phone",
      "location",
      "resumeUrl",
      "githubUrl",
      "linkedinUrl",
      "portfolioUrl",
      "availabilityStatus",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] =
          req.body[field];
      }
    });

    // Handle profile image replacement
    if (req.body.profileImage) {
      const oldPublicId =
        settings.profileImage?.publicId;

      const newPublicId =
        req.body.profileImage.publicId ??
        oldPublicId ??
        "";

      const newUrl =
        req.body.profileImage.url ??
        settings.profileImage?.url ??
        "";

      if (
        oldPublicId &&
        newPublicId &&
        oldPublicId !== newPublicId
      ) {
        await cloudinary.uploader.destroy(
          oldPublicId
        );
      }

      settings.profileImage = {
        url: newUrl,
        publicId: newPublicId,
      };
    }

    const updatedSettings =
      await settings.save();

    return successResponse(
      res,
      200,
      "Portfolio settings updated successfully.",
      {
        settings: updatedSettings,
      }
    );
  }
);