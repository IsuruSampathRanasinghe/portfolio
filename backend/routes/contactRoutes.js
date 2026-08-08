import express from "express";

import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  createContactSchema,
  updateContactStatusSchema,
} from "../utils/validators/contactValidator.js";

const router = express.Router();

// Public
router.post(
  "/",
  validate(createContactSchema),
  createContactMessage
);

// Admin
router.get(
  "/",
  protect,
  getContactMessages
);

router.get(
  "/:id",
  protect,
  getContactMessageById
);

router.put(
  "/:id",
  protect,
  validate(updateContactStatusSchema),
  updateContactMessage
);

router.delete(
  "/:id",
  protect,
  deleteContactMessage
);

export default router;