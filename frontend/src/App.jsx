import {
  lazy,
  Suspense,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";

import ProtectedRoute from "./routes/ProtectedRoute";

import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy-loaded pages
const NotFound = lazy(
  () =>
    import(
      "./pages/public/NotFound"
    )
);

const Login = lazy(
  () =>
    import(
      "./pages/admin/Login"
    )
);

const Dashboard = lazy(
  () =>
    import(
      "./pages/admin/Dashboard"
    )
);

const AdminProjects = lazy(
  () =>
    import(
      "./pages/admin/Projects"
    )
);

const AdminSkills = lazy(
  () =>
    import(
      "./pages/admin/Skills"
    )
);

const AdminEducation = lazy(
  () =>
    import(
      "./pages/admin/Education"
    )
);

const AdminExperience = lazy(
  () =>
    import(
      "./pages/admin/Experience"
    )
);

const AdminMessages = lazy(
  () =>
    import(
      "./pages/admin/Messages"
    )
);

const AdminSettings = lazy(
  () =>
    import(
      "./pages/admin/Settings"
    )
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <LoadingSpinner
            fullScreen
            text="Loading..."
          />
        }
      >
        <Routes>
          {/* Public */}
          <Route
            element={
              <PublicLayout />
            }
          >
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

          {/* Protected Admin */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
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
              element={
                <AdminProjects />
              }
            />

            <Route
              path="/admin/skills"
              element={
                <AdminSkills />
              }
            />

            <Route
              path="/admin/education"
              element={
                <AdminEducation />
              }
            />

            <Route
              path="/admin/experience"
              element={
                <AdminExperience />
              }
            />

            <Route
              path="/admin/messages"
              element={
                <AdminMessages />
              }
            />

            <Route
              path="/admin/settings"
              element={
                <AdminSettings />
              }
            />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;