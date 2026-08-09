import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onCancel}
              className="absolute right-5 top-5 text-xl text-slate-500 transition hover:text-white"
              aria-label="Close"
            >
              <FiX />
            </button>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                danger
                  ? "bg-red-500/10 text-red-400"
                  : "bg-blue-500/10 text-blue-400"
              }`}
            >
              <FiAlertTriangle className="text-xl" />
            </div>

            <h3 className="mt-5 font-[Poppins] text-xl font-semibold text-white">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {message}
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-50"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  danger
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-blue-500 hover:bg-blue-400"
                }`}
              >
                {loading
                  ? "Please wait..."
                  : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;