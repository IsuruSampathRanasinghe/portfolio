import jwt from "jsonwebtoken";

const generateToken = (adminId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET environment variable is not configured."
    );
  }

  return jwt.sign(
    {
      id: adminId,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "7d",
    }
  );
};

export default generateToken;