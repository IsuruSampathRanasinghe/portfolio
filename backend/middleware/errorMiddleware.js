import multer from "multer";

const errorHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode =
    error.statusCode ||
    (res.statusCode !== 200
      ? res.statusCode
      : 500);

  let message =
    error.message ||
    "Internal server error.";

  // Invalid MongoDB ObjectId
  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID.";
  }

  // MongoDB duplicate key
  if (error.code === 11000) {
    statusCode = 400;
    message = "Duplicate value.";
  }

  // Multer upload errors
  if (
    error instanceof
    multer.MulterError
  ) {
    statusCode = 400;

    if (
      error.code ===
      "LIMIT_FILE_SIZE"
    ) {
      message =
        "Image size must be less than 5MB.";
    } else {
      message =
        "Unable to process uploaded file.";
    }
  }

  const isProduction =
    process.env.NODE_ENV ===
    "production";

  // Don't expose unexpected internal
  // error details in production.
  if (
    isProduction &&
    statusCode >= 500
  ) {
    message =
      "Internal server error.";
  }

  res.status(statusCode).json({
    success: false,
    message,

    ...(!isProduction && {
      stack: error.stack,
    }),
  });
};

export default errorHandler;