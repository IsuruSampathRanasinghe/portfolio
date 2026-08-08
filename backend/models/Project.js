import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    image: {
        url: {
            type: String,
            default: "",
        },

        publicId: {
            type: String,
            default: "",
        },
    },

    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },

    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      default: "Web Development",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Completed", "In Progress"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;