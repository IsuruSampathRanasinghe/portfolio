import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const AdminLayout = () => {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="lg:pl-72">
        <Topbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="min-h-[calc(100vh-5rem)] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;