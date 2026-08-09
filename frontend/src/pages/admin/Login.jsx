import {
  useEffect,
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  loginAdmin,
} from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
  } = useAuth();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );
    }
  }, [
    isAuthenticated,
    navigate,
  ]);

  const onSubmit = async (
    formData
  ) => {
    try {
      setSubmitting(true);

      const data =
        await loginAdmin(
          formData
        );

      login(
        data.token,
        data.admin
      );

      toast.success(
        "Login successful."
      );

      navigate(
        "/admin/dashboard"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to login."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-12">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <FiArrowLeft />

          Back to portfolio
        </button>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-9">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
              IS
            </div>

            <h1 className="mt-5 font-[Poppins] text-2xl font-bold text-white">
              Admin Login
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Sign in to manage your
              portfolio content.
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit(
                onSubmit
              )
            }
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  {...register(
                    "email",
                    {
                      required:
                        "Email is required.",
                      pattern: {
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Enter a valid email address.",
                      },
                    }
                  )}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {
                    errors.email
                      .message
                  }
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  {...register(
                    "password",
                    {
                      required:
                        "Password is required.",
                      minLength: {
                        value: 6,
                        message:
                          "Password must contain at least 6 characters.",
                      },
                    }
                  )}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3.5 pl-11 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) =>
                        !value
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                submitting
              }
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;