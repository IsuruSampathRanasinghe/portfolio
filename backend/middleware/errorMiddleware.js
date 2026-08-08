// export const notFound = (req, res, next) => {
//   const error = new Error(`Route not found: ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// export const errorHandler = (error, req, res, next) => {
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   let message = error.message;

//   if (error.name === "CastError") {
//     statusCode = 400;
//     message = "Invalid resource ID.";
//   }

//   if (error.code === "LIMIT_FILE_SIZE") {
//     statusCode = 400;
//     message = "Image size must be less than 5 MB.";
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     stack: process.env.NODE_ENV === "production" ? null : error.stack,
//   });
// };


import multer from "multer";

const errorHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  let message = error.message;

  if (error.statusCode) {
    statusCode = error.statusCode;
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID.";
  }

  if (error.code === 11000) {
    statusCode = 400;
    message = "Duplicate value.";
  }

  if (
    error instanceof multer.MulterError &&
    error.code === "LIMIT_FILE_SIZE"
  ) {
    statusCode = 400;
    message =
      "Image size must be less than 5MB.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? undefined
        : error.stack,
  });
};

export default errorHandler;