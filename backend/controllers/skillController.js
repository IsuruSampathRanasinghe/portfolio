import Skill from "../models/Skill.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/apiResponse.js";


// GET /api/skills
// Public
export const getSkills = asyncHandler(
  async (req, res) => {
    const {
      search,
      category,
      featured,
    } = req.query;

    const filter = {};

    // Search by skill name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter featured skills
    if (featured !== undefined) {
      filter.featured =
        featured === "true";
    }

    const skills = await Skill.find(filter).sort({
      displayOrder: 1,
      name: 1,
    });

    return successResponse(
      res,
      200,
      "Skills retrieved successfully.",
      {
        count: skills.length,
        skills,
      }
    );
  }
);


// GET /api/skills/:id
// Public
export const getSkillById = asyncHandler(
  async (req, res) => {
    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      throw new ApiError(
        404,
        "Skill not found."
      );
    }

    return successResponse(
      res,
      200,
      "Skill retrieved successfully.",
      {
        skill,
      }
    );
  }
);


// POST /api/skills
// Admin
export const createSkill = asyncHandler(
  async (req, res) => {
    const {
      name,
      category,
      proficiency,
      icon = "",
      displayOrder = 0,
      featured = false,
    } = req.body;

    // Prevent duplicate skill names
    const existingSkill = await Skill.findOne({
      name: {
        $regex: `^${escapeRegex(name)}$`,
        $options: "i",
      },
    });

    if (existingSkill) {
      throw new ApiError(
        409,
        "A skill with this name already exists."
      );
    }

    const skill = await Skill.create({
      name,
      category,
      proficiency,
      icon,
      displayOrder,
      featured,
    });

    return successResponse(
      res,
      201,
      "Skill created successfully.",
      {
        skill,
      }
    );
  }
);


// PUT /api/skills/:id
// Admin
export const updateSkill = asyncHandler(
  async (req, res) => {
    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      throw new ApiError(
        404,
        "Skill not found."
      );
    }

    // Check duplicate name when changing skill name
    if (
      req.body.name &&
      req.body.name.toLowerCase() !==
        skill.name.toLowerCase()
    ) {
      const existingSkill =
        await Skill.findOne({
          name: {
            $regex: `^${escapeRegex(req.body.name)}$`,
            $options: "i",
          },
          _id: {
            $ne: skill._id,
          },
        });

      if (existingSkill) {
        throw new ApiError(
          409,
          "A skill with this name already exists."
        );
      }
    }

    const allowedFields = [
      "name",
      "category",
      "proficiency",
      "icon",
      "displayOrder",
      "featured",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        skill[field] = req.body[field];
      }
    });

    const updatedSkill =
      await skill.save();

    return successResponse(
      res,
      200,
      "Skill updated successfully.",
      {
        skill: updatedSkill,
      }
    );
  }
);


// DELETE /api/skills/:id
// Admin
export const deleteSkill = asyncHandler(
  async (req, res) => {
    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      throw new ApiError(
        404,
        "Skill not found."
      );
    }

    await skill.deleteOne();

    return successResponse(
      res,
      200,
      "Skill deleted successfully."
    );
  }
);


// Escape regex special characters
const escapeRegex = (value) => {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
};