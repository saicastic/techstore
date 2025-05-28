// backend/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // Handle invalid URLs
  if (err.message?.includes("Invalid URL")) {
    statusCode = 400;
    message = "Invalid URL format";
  }

  // Handle axios errors
  if (err.isAxiosError) {
    statusCode = err.response?.status || 502;
    message = err.response?.data?.message || "Network Error";
  }

  // Log the error stack in development
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export { errorHandler };
