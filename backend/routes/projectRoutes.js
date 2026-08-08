import express from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../utils/validators/projectValidator.js";

const router = express.Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected admin routes
router.post(
  "/",
  protect,
  validate(createProjectSchema),
  createProject
);

router.put(
  "/:id",
  protect,
  validate(updateProjectSchema),
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;