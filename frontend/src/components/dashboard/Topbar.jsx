import {
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

const Topbar = ({
  onMenuClick,
}) => {
  const navigate =
    useNavigate();

  const {
    admin,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();

    navigate(
      "/admin/login",
      {
        replace: true,
      }
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/85 px-5 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={
            onMenuClick
          }
          className="rounded-lg p-2 text-xl text-slate-400 transition hover:bg-slate-900 hover:text-white lg:hidden"
        >
          <FiMenu />
        </button>

        <div>
          <p className="text-sm text-slate-500">
            Welcome back
          </p>

          <p className="font-semibold text-white">
            {admin?.name ||
              "Admin"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={
          handleLogout
        }
        className="inline-flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
      >
        <FiLogOut />

        <span className="hidden sm:inline">
          Logout
        </span>
      </button>
    </header>
  );
};

export default Topbar;