import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Education from "../models/Education.js";
import Experience from "../models/Experience.js";
import ContactMessage from "../models/ContactMessage.js";

import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";


export const getDashboardStats = asyncHandler(
  async (req, res) => {
    const [
      totalProjects,
      completedProjects,
      inProgressProjects,
      featuredProjects,

      totalSkills,
      featuredSkills,

      totalEducation,
      totalExperience,

      totalMessages,
      unreadMessages,
      readMessages,
      repliedMessages,

      recentMessages,
      recentProjects,
    ] = await Promise.all([
      Project.countDocuments(),

      Project.countDocuments({
        status: "Completed",
      }),

      Project.countDocuments({
        status: "In Progress",
      }),

      Project.countDocuments({
        featured: true,
      }),

      Skill.countDocuments(),

      Skill.countDocuments({
        featured: true,
      }),

      Education.countDocuments(),

      Experience.countDocuments(),

      ContactMessage.countDocuments(),

      ContactMessage.countDocuments({
        status: "Unread",
      }),

      ContactMessage.countDocuments({
        status: "Read",
      }),

      ContactMessage.countDocuments({
        status: "Replied",
      }),

      ContactMessage.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          "name email subject status createdAt"
        ),

      Project.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          "title category status featured createdAt image"
        ),
    ]);

    return successResponse(
      res,
      200,
      "Dashboard statistics retrieved successfully.",
      {
        stats: {
          projects: {
            total: totalProjects,
            completed: completedProjects,
            inProgress:
              inProgressProjects,
            featured:
              featuredProjects,
          },

          skills: {
            total: totalSkills,
            featured:
              featuredSkills,
          },

          education: {
            total: totalEducation,
          },

          experience: {
            total: totalExperience,
          },

          messages: {
            total: totalMessages,
            unread: unreadMessages,
            read: readMessages,
            replied: repliedMessages,
          },
        },

        recentMessages,
        recentProjects,
      }
    );
  }
);