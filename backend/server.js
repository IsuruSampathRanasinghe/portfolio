import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

// Routes
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Error middleware
import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

const PORT = process.env.PORT || 5000;

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(compression());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parsing
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

/*
|--------------------------------------------------------------------------
| Logging
|--------------------------------------------------------------------------
*/

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/*
|--------------------------------------------------------------------------
| Rate Limiting
|--------------------------------------------------------------------------
*/

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Stricter login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

/*
|--------------------------------------------------------------------------
| Basic Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Portfolio API",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
app.use(
  "/api/health",
  apiLimiter,
  healthRoutes
);

// Login gets stricter protection
app.use(
  "/api/auth/login",
  loginLimiter
);

// Other authentication routes
app.use(
  "/api/auth",
  apiLimiter,
  authRoutes
);

// Projects
app.use(
  "/api/projects",
  apiLimiter,
  projectRoutes
);

// Skills
app.use(
  "/api/skills",
  apiLimiter,
  skillRoutes
);

// Education
app.use(
  "/api/education",
  apiLimiter,
  educationRoutes
);

// Experience
app.use(
  "/api/experience",
  apiLimiter,
  experienceRoutes
);

// Contact messages
app.use(
  "/api/contact",
  apiLimiter,
  contactRoutes
);

// Portfolio settings
app.use(
  "/api/settings",
  apiLimiter,
  settingsRoutes
);

// Dashboard
app.use(
  "/api/dashboard",
  apiLimiter,
  dashboardRoutes
);

// Uploads
// Uploads are intentionally not using the general API limiter here.
app.use(
  "/api/upload",
  uploadRoutes
);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      `Unable to start server: ${error.message}`
    );

    process.exit(1);
  }
};

startServer();