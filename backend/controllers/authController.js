import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// POST /api/auth/login
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    const passwordMatches = await admin.matchPassword(password);

    if (!passwordMatches) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/profile
export const getAdminProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

// GET /api/auth/check
export const checkAuth = async (req, res) => {
  res.status(200).json({
    success: true,
    authenticated: true,
    admin: req.admin,
  });
};