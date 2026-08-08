import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Programming Language",
        "Tools",
        "Cloud",
        "Other",
      ],
    },

    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    icon: {
      type: String,
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;