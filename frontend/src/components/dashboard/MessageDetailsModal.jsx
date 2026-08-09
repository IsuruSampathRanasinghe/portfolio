import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiCalendar,
  FiMail,
  FiUser,
  FiX,
} from "react-icons/fi";

const formatDateTime = (date) => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const statusStyles = {
  Unread:
    "border-blue-500/20 bg-blue-500/10 text-blue-300",

  Read:
    "border-slate-600 bg-slate-800 text-slate-300",

  Replied:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

const MessageDetailsModal = ({
  open,
  message,
  updating = false,
  onClose,
  onStatusChange,
}) => {
  return (
    <AnimatePresence>
      {open && message && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          <motion.button
            type="button"
            aria-label="Close message"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-sm text-slate-500">
                  Contact Message
                </p>

                <h2 className="mt-1 font-[Poppins] text-xl font-semibold text-white">
                  {message.subject}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-xl text-slate-500 transition hover:bg-slate-900 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-3">
                    <FiUser className="text-blue-400" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Name
                      </p>

                      <p className="mt-1 font-medium text-slate-200">
                        {message.name}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`mailto:${message.email}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition hover:border-blue-500/30"
                >
                  <div className="flex items-center gap-3">
                    <FiMail className="text-blue-400" />

                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">
                        Email
                      </p>

                      <p className="mt-1 truncate font-medium text-slate-200">
                        {message.email}
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <FiCalendar />

                  {formatDateTime(
                    message.createdAt
                  )}
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    statusStyles[
                      message.status
                    ] ||
                    statusStyles.Read
                  }`}
                >
                  {message.status}
                </span>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-slate-400">
                  Message
                </p>

                <div className="whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-900/50 p-5 leading-7 text-slate-300">
                  {message.message}
                </div>
              </div>

              <div className="mt-7 border-t border-slate-800 pt-6">
                <p className="mb-3 text-sm font-medium text-slate-400">
                  Status
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Unread",
                    "Read",
                    "Replied",
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={
                        updating ||
                        message.status ===
                          status
                      }
                      onClick={() =>
                        onStatusChange(
                          status
                        )
                      }
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition disabled:cursor-default ${
                        message.status ===
                        status
                          ? statusStyles[
                              status
                            ]
                          : "border-slate-700 bg-slate-900 text-slate-400 hover:border-blue-500/40 hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Close
                </button>

                <a
                  href={`mailto:${message.email}?subject=${encodeURIComponent(
                    `Re: ${message.subject}`
                  )}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white"
                >
                  <FiMail />
                  Reply by Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessageDetailsModal;