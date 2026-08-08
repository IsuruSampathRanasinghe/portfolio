import Experience from "../models/Experience.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/apiResponse.js";


// GET /api/experience
// Public
export const getExperiences = asyncHandler(
  async (req, res) => {
    const experiences = await Experience.find().sort({
      displayOrder: 1,
      startDate: -1,
    });

    return successResponse(
      res,
      200,
      "Experience records retrieved successfully.",
      {
        count: experiences.length,
        experiences,
      }
    );
  }
);


// GET /api/experience/:id
// Public
export const getExperienceById = asyncHandler(
  async (req, res) => {
    const experience = await Experience.findById(
      req.params.id
    );

    if (!experience) {
      throw new ApiError(
        404,
        "Experience record not found."
      );
    }

    return successResponse(
      res,
      200,
      "Experience record retrieved successfully.",
      {
        experience,
      }
    );
  }
);


// POST /api/experience
// Admin
export const createExperience = asyncHandler(
  async (req, res) => {
    const {
      company,
      position,
      employmentType = "Internship",
      startDate,
      endDate = null,
      currentlyWorking = false,
      description = "",
      location = "",
      technologies = [],
      companyUrl = "",
      displayOrder = 0,
    } = req.body;

    const start = new Date(startDate);

    if (Number.isNaN(start.getTime())) {
      throw new ApiError(
        400,
        "Start date is invalid."
      );
    }

    let end = null;

    if (!currentlyWorking && endDate) {
      end = new Date(endDate);

      if (Number.isNaN(end.getTime())) {
        throw new ApiError(
          400,
          "End date is invalid."
        );
      }

      if (end < start) {
        throw new ApiError(
          400,
          "End date cannot be earlier than start date."
        );
      }
    }

    const experience = await Experience.create({
      company,
      position,
      employmentType,
      startDate: start,
      endDate: currentlyWorking ? null : end,
      currentlyWorking,
      description,
      location,
      technologies,
      companyUrl,
      displayOrder,
    });

    return successResponse(
      res,
      201,
      "Experience record created successfully.",
      {
        experience,
      }
    );
  }
);


// PUT /api/experience/:id
// Admin
export const updateExperience = asyncHandler(
  async (req, res) => {
    const experience = await Experience.findById(
      req.params.id
    );

    if (!experience) {
      throw new ApiError(
        404,
        "Experience record not found."
      );
    }

    const allowedFields = [
      "company",
      "position",
      "employmentType",
      "description",
      "location",
      "technologies",
      "companyUrl",
      "displayOrder",
      "currentlyWorking",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        experience[field] = req.body[field];
      }
    });

    if (req.body.startDate !== undefined) {
      const start = new Date(req.body.startDate);

      if (Number.isNaN(start.getTime())) {
        throw new ApiError(
          400,
          "Start date is invalid."
        );
      }

      experience.startDate = start;
    }

    if (experience.currentlyWorking) {
      experience.endDate = null;
    } else if (req.body.endDate !== undefined) {
      if (
        req.body.endDate === null ||
        req.body.endDate === ""
      ) {
        experience.endDate = null;
      } else {
        const end = new Date(req.body.endDate);

        if (Number.isNaN(end.getTime())) {
          throw new ApiError(
            400,
            "End date is invalid."
          );
        }

        experience.endDate = end;
      }
    }

    if (
      experience.startDate &&
      experience.endDate &&
      experience.endDate < experience.startDate
    ) {
      throw new ApiError(
        400,
        "End date cannot be earlier than start date."
      );
    }

    const updatedExperience =
      await experience.save();

    return successResponse(
      res,
      200,
      "Experience record updated successfully.",
      {
        experience: updatedExperience,
      }
    );
  }
);


// DELETE /api/experience/:id
// Admin
export const deleteExperience = asyncHandler(
  async (req, res) => {
    const experience = await Experience.findById(
      req.params.id
    );

    if (!experience) {
      throw new ApiError(
        404,
        "Experience record not found."
      );
    }

    await experience.deleteOne();

    return successResponse(
      res,
      200,
      "Experience record deleted successfully."
    );
  }
);