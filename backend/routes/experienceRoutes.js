import express from "express";

import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "../utils/validators/experienceValidator.js";

const router = express.Router();

// Public
router.get("/", getExperiences);
router.get("/:id", getExperienceById);

// Admin
router.post(
  "/",
  protect,
  validate(createExperienceSchema),
  createExperience
);

router.put(
  "/:id",
  protect,
  validate(updateExperienceSchema),
  updateExperience
);

router.delete(
  "/:id",
  protect,
  deleteExperience
);

export default router;