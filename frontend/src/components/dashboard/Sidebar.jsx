import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
} from "react-router-dom";

import {
  FiHome,
  FiFolder,
  FiCode,
  FiBookOpen,
  FiBriefcase,
  FiMail,
  FiSettings,
  FiX,
} from "react-icons/fi";

import {
  getDashboardStats,
} from "../../services/dashboardService";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: FiHome,
  },
  {
    name: "Projects",
    path: "/admin/projects",
    icon: FiFolder,
  },
  {
    name: "Skills",
    path: "/admin/skills",
    icon: FiCode,
  },
  {
    name: "Education",
    path: "/admin/education",
    icon: FiBookOpen,
  },
  {
    name: "Experience",
    path: "/admin/experience",
    icon: FiBriefcase,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: FiMail,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: FiSettings,
  },
];

const Sidebar = ({
  open,
  onClose,
}) => {
  const [
    unreadMessages,
    setUnreadMessages,
  ] = useState(0);

  useEffect(() => {
    const fetchUnreadCount =
      async () => {
        try {
          const data =
            await getDashboardStats();

          setUnreadMessages(
            data?.stats?.messages
              ?.unread || 0
          );
        } catch (error) {
          console.error(
            "Unable to load unread count:",
            error
          );
        }
      };

    fetchUnreadCount();
  }, []);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div>
            <p className="font-[Poppins] text-xl font-bold text-white">
              Isuru
              <span className="text-blue-500">
                .
              </span>
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Admin Dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-xl text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
          >
            <FiX />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {links.map(
              ({
                name,
                path,
                icon: Icon,
              }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={({
                    isActive,
                  }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <Icon className="text-lg" />
                    {name}
                  </span>

                  {name ===
                    "Messages" &&
                    unreadMessages >
                      0 && (
                      <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                        {
                          unreadMessages
                        }
                      </span>
                    )}
                </NavLink>
              )
            )}
          </div>
        </nav>

        <div className="border-t border-slate-800 px-5 py-5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-800 px-4 py-3 text-center text-sm font-medium text-slate-400 transition hover:border-slate-600 hover:text-white"
          >
            View Portfolio
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;