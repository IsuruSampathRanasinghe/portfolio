import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import LoadingSpinner from "../components/common/LoadingSpinner";

const ProtectedRoute = ({
  children,
}) => {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Checking authentication..."
      />
    );
  }

  return isAuthenticated
    ? children
    : (
      <Navigate
        to="/admin/login"
        replace
      />
    );
};

export default ProtectedRoute;