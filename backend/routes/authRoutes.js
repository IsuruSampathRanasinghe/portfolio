import express from "express";

import {
  loginAdmin,
  getAdminProfile,
  checkAuth,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  loginSchema,
} from "../utils/validators/authValidator.js";

const router = express.Router();

// Public
router.post(
  "/login",
  validate(loginSchema),
  loginAdmin
);

// Admin
router.get(
  "/profile",
  protect,
  getAdminProfile
);

router.get(
  "/check",
  protect,
  checkAuth
);

export default router;