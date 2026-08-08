import ContactMessage from "../models/ContactMessage.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/apiResponse.js";


// POST /api/contact
// Public
export const createContactMessage = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    const contactMessage =
      await ContactMessage.create({
        name,
        email,
        subject,
        message,
      });

    return successResponse(
      res,
      201,
      "Your message has been sent successfully.",
      {
        contactMessage: {
          id: contactMessage._id,
          name: contactMessage.name,
          email: contactMessage.email,
          subject: contactMessage.subject,
          status: contactMessage.status,
          createdAt: contactMessage.createdAt,
        },
      }
    );
  }
);


// GET /api/contact
// Admin
export const getContactMessages = asyncHandler(
  async (req, res) => {
    const {
      status,
      search,
    } = req.query;

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    if (page < 1) {
      page = 1;
    }

    if (limit < 1) {
      limit = 10;
    }

    if (limit > 50) {
      limit = 50;
    }

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [
      messages,
      totalMessages,
    ] = await Promise.all([
      ContactMessage.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      ContactMessage.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(
      totalMessages / limit
    );

    return successResponse(
      res,
      200,
      "Contact messages retrieved successfully.",
      {
        messages,

        pagination: {
          currentPage: page,
          totalPages,
          totalMessages,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      }
    );
  }
);


// GET /api/contact/:id
// Admin
export const getContactMessageById = asyncHandler(
  async (req, res) => {
    const message =
      await ContactMessage.findById(
        req.params.id
      );

    if (!message) {
      throw new ApiError(
        404,
        "Contact message not found."
      );
    }

    return successResponse(
      res,
      200,
      "Contact message retrieved successfully.",
      {
        message,
      }
    );
  }
);


// PUT /api/contact/:id
// Admin
export const updateContactMessage = asyncHandler(
  async (req, res) => {
    const message =
      await ContactMessage.findById(
        req.params.id
      );

    if (!message) {
      throw new ApiError(
        404,
        "Contact message not found."
      );
    }

    message.status = req.body.status;

    const updatedMessage =
      await message.save();

    return successResponse(
      res,
      200,
      "Contact message status updated successfully.",
      {
        contactMessage: updatedMessage,
      }
    );
  }
);


// DELETE /api/contact/:id
// Admin
export const deleteContactMessage = asyncHandler(
  async (req, res) => {
    const message =
      await ContactMessage.findById(
        req.params.id
      );

    if (!message) {
      throw new ApiError(
        404,
        "Contact message not found."
      );
    }

    await message.deleteOne();

    return successResponse(
      res,
      200,
      "Contact message deleted successfully."
    );
  }
);