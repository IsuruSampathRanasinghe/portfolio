import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/common/BackToTop";

const PublicLayout = () => {
  return (
    <>
      {/* Skip link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg outline-none transition-transform focus:translate-y-0 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Skip to main content
      </a>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <Footer />

      <BackToTop />
    </>
  );
};

export default PublicLayout;