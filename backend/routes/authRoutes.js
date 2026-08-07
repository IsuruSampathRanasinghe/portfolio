import express from "express";

import {
  loginAdmin,
  getAdminProfile,
  checkAuth,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/profile", protect, getAdminProfile);

router.get("/check", protect, checkAuth);

export default router;