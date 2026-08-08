import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/apiResponse.js";


// GET /api/projects
// Public
export const getProjects = asyncHandler(
  async (req, res) => {
    const {
      search,
      category,
      featured,
      status,
      sort = "latest",
    } = req.query;

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 6;

    if (page < 1) {
      page = 1;
    }

    if (limit < 1) {
      limit = 6;
    }

    if (limit > 50) {
      limit = 50;
    }

    const filter = {};

    // Search title and description
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          technologies: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Featured filter
    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    if (sort === "title") {
      sortOption = {
        title: 1,
      };
    }

    const skip = (page - 1) * limit;

    const [
      projects,
      totalProjects,
    ] = await Promise.all([
      Project.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit),

      Project.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(
      totalProjects / limit
    );

    return successResponse(
      res,
      200,
      "Projects retrieved successfully.",
      {
        projects,

        pagination: {
          currentPage: page,
          totalPages,
          totalProjects,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      }
    );
  }
);


// GET /api/projects/:id
// Public
export const getProjectById = asyncHandler(
  async (req, res) => {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    return successResponse(
      res,
      200,
      "Project retrieved successfully.",
      {
        project,
      }
    );
  }
);


// POST /api/projects
// Admin
export const createProject = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      technologies = [],
      image = {},
      githubUrl = "",
      liveUrl = "",
      featured = false,
      category = "Web Development",
      status = "Completed",
    } = req.body;

    const project = await Project.create({
      title,
      description,
      technologies,

      image: {
        url: image?.url || "",
        publicId: image?.publicId || "",
      },

      githubUrl,
      liveUrl,
      featured,
      category,
      status,
    });

    return successResponse(
      res,
      201,
      "Project created successfully.",
      {
        project,
      }
    );
  }
);


// PUT /api/projects/:id
// Admin
export const updateProject = asyncHandler(
  async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    const allowedFields = [
      "title",
      "description",
      "technologies",
      "githubUrl",
      "liveUrl",
      "featured",
      "category",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    // Handle image update
    if (req.body.image) {
      const newImageUrl =
        req.body.image.url ?? project.image?.url ?? "";

      const newPublicId =
        req.body.image.publicId ??
        project.image?.publicId ??
        "";

      const oldPublicId = project.image?.publicId;

      // Delete old Cloudinary image only when
      // a different image is being assigned
      if (
        oldPublicId &&
        newPublicId &&
        oldPublicId !== newPublicId
      ) {
        await cloudinary.uploader.destroy(oldPublicId);
      }

      project.image = {
        url: newImageUrl,
        publicId: newPublicId,
      };
    }

    const updatedProject = await project.save();

    return successResponse(
      res,
      200,
      "Project updated successfully.",
      {
        project: updatedProject,
      }
    );
  }
);


// DELETE /api/projects/:id
// Admin
export const deleteProject = asyncHandler(
  async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    // Delete image from Cloudinary if it exists
    if (project.image?.publicId) {
      await cloudinary.uploader.destroy(
        project.image.publicId
      );
    }

    // Delete project from MongoDB
    await project.deleteOne();

    return successResponse(
      res,
      200,
      "Project deleted successfully."
    );
  }
);