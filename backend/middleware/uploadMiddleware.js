import multer from "multer";

import ApiError from "../utils/ApiError.js";

const storage =
  multer.memoryStorage();

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const fileFilter = (
  req,
  file,
  cb
) => {
  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
    return;
  }

  cb(
    new ApiError(
      400,
      "Only JPEG, PNG, WEBP, and GIF images are allowed."
    ),
    false
  );
};

const upload = multer({
  storage,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;