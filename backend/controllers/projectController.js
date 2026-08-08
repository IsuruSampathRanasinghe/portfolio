import Project from "../models/Project.js";

// GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      technologies,
      image,
      githubUrl,
      liveUrl,
      featured,
      category,
      status,
    } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error("Title and description are required.");
    }

    const project = await Project.create({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
      image,
      githubUrl,
      liveUrl,
      featured,
      category,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    const allowedFields = [
      "title",
      "description",
      "technologies",
      "image",
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

    const updatedProject = await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};