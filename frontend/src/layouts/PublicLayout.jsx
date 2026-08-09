import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/common/BackToTop";

const PublicLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />

      <BackToTop />
    </>
  );
};

export default PublicLayout;