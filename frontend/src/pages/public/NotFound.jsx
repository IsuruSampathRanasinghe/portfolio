import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5">
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-center"
      >
        <p className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text font-[Poppins] text-8xl font-bold text-transparent sm:text-9xl">
          404
        </p>

        <h1 className="mt-5 font-[Poppins] text-3xl font-bold text-white">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
        >
          <FiHome />

          Back to Home
        </Link>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mx-auto mt-5 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-300"
        >
          <FiArrowLeft />
          Go back
        </button>
      </motion.div>
    </main>
  );
};

export default NotFound;