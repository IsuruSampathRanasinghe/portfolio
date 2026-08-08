import express from "express";

import {
  uploadImage,
  deleteImage,
} from "../controllers/uploadController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/image",
  protect,
  upload.single("image"),
  uploadImage
);

router.delete(
  "/image",
  protect,
  deleteImage
);

export default router;