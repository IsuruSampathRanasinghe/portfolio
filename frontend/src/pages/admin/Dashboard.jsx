import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiMail,
  FiPlus,
  FiSettings,
} from "react-icons/fi";

import PageHeader from "../../components/dashboard/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";

import {
  getDashboardStats,
} from "../../services/dashboardService";

const Dashboard = () => {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDashboard =
    async () => {
      try {
        setLoading(true);

        const response =
          await getDashboardStats();

        setData(response);
        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner text="Loading dashboard..." />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={
          fetchDashboard
        }
      />
    );
  }

  const stats =
    data?.stats || {};

  const cards = [
    {
      title: "Projects",
      value:
        stats.projects
          ?.total || 0,

      subtitle:
        `${
          stats.projects
            ?.featured || 0
        } featured`,

      icon: FiFolder,
    },

    {
      title: "Skills",
      value:
        stats.skills
          ?.total || 0,

      subtitle:
        `${
          stats.skills
            ?.featured || 0
        } featured`,

      icon: FiCode,
    },

    {
      title: "Education",
      value:
        stats.education
          ?.total || 0,

      subtitle:
        "Education records",

      icon: FiBookOpen,
    },

    {
      title: "Experience",
      value:
        stats.experience
          ?.total || 0,

      subtitle:
        "Experience records",

      icon: FiBriefcase,
    },

    {
      title: "Messages",
      value:
        stats.messages
          ?.total || 0,

      subtitle:
        `${
          stats.messages
            ?.unread || 0
        } unread`,

      icon: FiMail,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your portfolio content and recent activity."
      />

      {/* Unread Message Alert */}
      {stats.messages?.unread >
        0 && (
        <div className="mb-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-5 py-4 text-sm text-blue-300">
          You have{" "}
          <strong>
            {
              stats.messages
                .unread
            }
          </strong>{" "}
          unread contact{" "}
          {stats.messages
            .unread === 1
            ? "message"
            : "messages"}
          .
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(
          ({
            title,
            value,
            subtitle,
            icon: Icon,
          }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-xl text-blue-400 transition duration-300 group-hover:scale-110">
                <Icon />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {title}
              </p>

              <p className="mt-1 font-[Poppins] text-3xl font-bold text-white">
                {value}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {subtitle}
              </p>
            </div>
          )
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="font-[Poppins] text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quickly manage your
          portfolio content.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/projects"
            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-slate-300 transition hover:border-blue-500/30 hover:text-white"
          >
            <FiPlus className="text-blue-400" />

            Manage Projects
          </Link>

          <Link
            to="/admin/skills"
            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-slate-300 transition hover:border-blue-500/30 hover:text-white"
          >
            <FiCode className="text-blue-400" />

            Manage Skills
          </Link>

          <Link
            to="/admin/messages"
            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-slate-300 transition hover:border-blue-500/30 hover:text-white"
          >
            <FiMail className="text-blue-400" />

            View Messages
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-slate-300 transition hover:border-blue-500/30 hover:text-white"
          >
            <FiSettings className="text-blue-400" />

            Portfolio Settings
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Recent Messages */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-[Poppins] text-lg font-semibold text-white">
              Recent Messages
            </h2>

            <Link
              to="/admin/messages"
              className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              View All
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {data?.recentMessages
              ?.length > 0 ? (
              data.recentMessages.map(
                (message) => (
                  <div
                    key={
                      message._id
                    }
                    className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/20"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p
                        className={`font-medium ${
                          message.status ===
                          "Unread"
                            ? "text-white"
                            : "text-slate-200"
                        }`}
                      >
                        {
                          message.name
                        }
                      </p>

                      <span
                        className={`text-xs ${
                          message.status ===
                          "Unread"
                            ? "text-blue-400"
                            : message.status ===
                                "Replied"
                              ? "text-emerald-400"
                              : "text-slate-500"
                        }`}
                      >
                        {
                          message.status
                        }
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {
                        message.subject
                      }
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-slate-500">
                No recent messages.
              </p>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-[Poppins] text-lg font-semibold text-white">
              Recent Projects
            </h2>

            <Link
              to="/admin/projects"
              className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              View All
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {data?.recentProjects
              ?.length > 0 ? (
              data.recentProjects.map(
                (project) => (
                  <div
                    key={
                      project._id
                    }
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/20"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-200">
                        {
                          project.title
                        }
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          project.category
                        }
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-xs text-slate-400">
                        {
                          project.status
                        }
                      </span>

                      {project.featured && (
                        <p className="mt-1 text-xs text-blue-400">
                          Featured
                        </p>
                      )}
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-slate-500">
                No recent projects.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;