import mongoose from "mongoose";

const portfolioSettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
    },

    shortBio: {
      type: String,
      default: "",
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    profileImage: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    resumeUrl: {
      type: String,
      default: "",
      trim: true,
    },

    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },

    linkedinUrl: {
      type: String,
      default: "",
      trim: true,
    },

    portfolioUrl: {
      type: String,
      default: "",
      trim: true,
    },

    availabilityStatus: {
      type: String,
      enum: [
        "Available",
        "Open to Opportunities",
        "Not Available",
      ],
      default: "Open to Opportunities",
    },
  },
  {
    timestamps: true,
  }
);

const PortfolioSettings = mongoose.model(
  "PortfolioSettings",
  portfolioSettingsSchema
);

export default PortfolioSettings;