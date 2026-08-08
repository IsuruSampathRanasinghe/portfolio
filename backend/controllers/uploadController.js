import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};


// POST /api/upload/image
// Admin only
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("Please select an image.");
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "portfolio",
      resource_type: "image",
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    next(error);
  }
};


// DELETE /api/upload/image
// Admin only
export const deleteImage = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      res.status(400);
      throw new Error("Cloudinary public ID is required.");
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      res.status(400);
      throw new Error("Unable to delete image.");
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};