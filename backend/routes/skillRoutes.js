import express from "express";

import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createSkillSchema,
  updateSkillSchema,
} from "../utils/validators/skillValidator.js";

const router = express.Router();

// Public
router.get("/", getSkills);
router.get("/:id", getSkillById);

// Admin
router.post(
  "/",
  protect,
  validate(createSkillSchema),
  createSkill
);

router.put(
  "/:id",
  protect,
  validate(updateSkillSchema),
  updateSkill
);

router.delete(
  "/:id",
  protect,
  deleteSkill
);

export default router;