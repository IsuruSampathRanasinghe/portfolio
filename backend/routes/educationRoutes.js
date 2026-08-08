import express from "express";

import {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createEducationSchema,
  updateEducationSchema,
} from "../utils/validators/educationValidator.js";

const router = express.Router();

// Public routes
router.get("/", getEducation);
router.get("/:id", getEducationById);

// Admin routes
router.post(
  "/",
  protect,
  validate(createEducationSchema),
  createEducation
);

router.put(
  "/:id",
  protect,
  validate(updateEducationSchema),
  updateEducation
);

router.delete(
  "/:id",
  protect,
  deleteEducation
);

export default router;