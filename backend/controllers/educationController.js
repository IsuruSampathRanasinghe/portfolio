import Education from "../models/Education.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/apiResponse.js";


// GET /api/education
// Public
export const getEducation = asyncHandler(
  async (req, res) => {
    const education = await Education.find().sort({
      displayOrder: 1,
      startDate: -1,
    });

    return successResponse(
      res,
      200,
      "Education records retrieved successfully.",
      {
        count: education.length,
        education,
      }
    );
  }
);


// GET /api/education/:id
// Public
export const getEducationById = asyncHandler(
  async (req, res) => {
    const education = await Education.findById(
      req.params.id
    );

    if (!education) {
      throw new ApiError(
        404,
        "Education record not found."
      );
    }

    return successResponse(
      res,
      200,
      "Education record retrieved successfully.",
      {
        education,
      }
    );
  }
);


// POST /api/education
// Admin
export const createEducation = asyncHandler(
  async (req, res) => {
    const {
      institution,
      degree,
      fieldOfStudy = "",
      startDate,
      endDate = null,
      currentlyStudying = false,
      description = "",
      location = "",
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

    if (!currentlyStudying && endDate) {
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

    const education = await Education.create({
      institution,
      degree,
      fieldOfStudy,
      startDate: start,
      endDate: currentlyStudying
        ? null
        : end,
      currentlyStudying,
      description,
      location,
      displayOrder,
    });

    return successResponse(
      res,
      201,
      "Education record created successfully.",
      {
        education,
      }
    );
  }
);


// PUT /api/education/:id
// Admin
export const updateEducation = asyncHandler(
  async (req, res) => {
    const education = await Education.findById(
      req.params.id
    );

    if (!education) {
      throw new ApiError(
        404,
        "Education record not found."
      );
    }

    const allowedFields = [
      "institution",
      "degree",
      "fieldOfStudy",
      "description",
      "location",
      "displayOrder",
      "currentlyStudying",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        education[field] = req.body[field];
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

      education.startDate = start;
    }

    if (education.currentlyStudying) {
      education.endDate = null;
    } else if (req.body.endDate !== undefined) {
      if (
        req.body.endDate === null ||
        req.body.endDate === ""
      ) {
        education.endDate = null;
      } else {
        const end = new Date(req.body.endDate);

        if (Number.isNaN(end.getTime())) {
          throw new ApiError(
            400,
            "End date is invalid."
          );
        }

        education.endDate = end;
      }
    }

    if (
      education.endDate &&
      education.startDate &&
      education.endDate < education.startDate
    ) {
      throw new ApiError(
        400,
        "End date cannot be earlier than start date."
      );
    }

    const updatedEducation =
      await education.save();

    return successResponse(
      res,
      200,
      "Education record updated successfully.",
      {
        education: updatedEducation,
      }
    );
  }
);


// DELETE /api/education/:id
// Admin
export const deleteEducation = asyncHandler(
  async (req, res) => {
    const education = await Education.findById(
      req.params.id
    );

    if (!education) {
      throw new ApiError(
        404,
        "Education record not found."
      );
    }

    await education.deleteOne();

    return successResponse(
      res,
      200,
      "Education record deleted successfully."
    );
  }
);