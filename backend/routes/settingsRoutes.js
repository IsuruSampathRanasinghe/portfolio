import express from "express";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  updateSettingsSchema,
} from "../utils/validators/settingsValidator.js";

const router = express.Router();

// Public
router.get(
  "/",
  getSettings
);

// Admin
router.put(
  "/",
  protect,
  validate(updateSettingsSchema),
  updateSettings
);

export default router;