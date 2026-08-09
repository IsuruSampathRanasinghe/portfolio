import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import NotFound from "./pages/public/NotFound";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

import AdminProjects from "./pages/admin/Projects";
import AdminSkills from "./pages/admin/Skills";
import AdminEducation from "./pages/admin/Education";
import AdminExperience from "./pages/admin/Experience";
import AdminMessages from "./pages/admin/Messages";
import AdminSettings from "./pages/admin/Settings";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={<Home />}
          />
        </Route>

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Protected Admin Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin fallback */}
          <Route
            path="/admin"
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/admin/projects"
            element={<AdminProjects />}
          />

          <Route
            path="/admin/skills"
            element={<AdminSkills />}
          />

          <Route
            path="/admin/education"
            element={<AdminEducation />}
          />

          <Route
            path="/admin/experience"
            element={<AdminExperience />}
          />

          <Route
            path="/admin/messages"
            element={<AdminMessages />}
          />

          <Route
            path="/admin/settings"
            element={<AdminSettings />}
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;