import {
  useEffect,
  useRef,
} from "react";

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
  const dialogRef =
    useRef(null);

  const cancelButtonRef =
    useRef(null);

  const previousActiveElement =
    useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousActiveElement.current =
      document.activeElement;

    const timer = setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (
      event
    ) => {
      if (
        event.key ===
          "Escape" &&
        !loading
      ) {
        onCancel();
      }

      if (
        event.key === "Tab" &&
        dialogRef.current
      ) {
        const focusableElements =
          dialogRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

        if (
          focusableElements.length ===
          0
        ) {
          return;
        }

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length -
              1
          ];

        if (
          event.shiftKey &&
          document.activeElement ===
            firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement ===
            lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      clearTimeout(timer);

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousActiveElement.current?.focus?.();
    };
  }, [
    open,
    loading,
    onCancel,
  ]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Close confirmation dialog"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={
              loading
                ? undefined
                : onCancel
            }
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
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
            {/* Close button */}
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              aria-label="Close confirmation dialog"
              className="absolute right-5 top-5 rounded-lg p-1 text-xl text-slate-500 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiX
                aria-hidden="true"
              />
            </button>

            {/* Warning icon */}
            <div
              aria-hidden="true"
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                danger
                  ? "bg-red-500/10 text-red-400"
                  : "bg-blue-500/10 text-blue-400"
              }`}
            >
              <FiAlertTriangle className="text-xl" />
            </div>

            {/* Title */}
            <h3
              id="confirm-dialog-title"
              className="mt-5 font-[Poppins] text-xl font-semibold text-white"
            >
              {title}
            </h3>

            {/* Description */}
            <p
              id="confirm-dialog-description"
              className="mt-3 leading-7 text-slate-400"
            >
              {message}
            </p>

            {/* Actions */}
            <div className="mt-7 flex justify-end gap-3">
              <button
                ref={
                  cancelButtonRef
                }
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 outline-none transition hover:border-slate-500 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={
                  onConfirm
                }
                disabled={loading}
                aria-busy={
                  loading
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white outline-none transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50 ${
                  danger
                    ? "bg-red-500 hover:bg-red-400 focus-visible:ring-red-400"
                    : "bg-blue-500 hover:bg-blue-400 focus-visible:ring-blue-400"
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