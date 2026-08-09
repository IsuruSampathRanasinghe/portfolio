import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FiEye,
  FiMail,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import ConfirmModal from "../../components/common/ConfirmModal";
import MessageDetailsModal from "../../components/dashboard/MessageDetailsModal";

import {
  deleteContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} from "../../services/contactService";

const statusStyles = {
  Unread:
    "border-blue-500/20 bg-blue-500/10 text-blue-300",

  Read:
    "border-slate-700 bg-slate-800 text-slate-300",

  Replied:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(date));
};

const Messages = () => {
  const [messages, setMessages] =
    useState([]);

  const [pagination, setPagination] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [
    selectedMessage,
    setSelectedMessage,
  ] = useState(null);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);

  const fetchMessages =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await getContactMessages({
            page,
            limit: 10,
            search:
              search.trim() ||
              undefined,
            status:
              status ||
              undefined,
          });

        setMessages(
          data.messages || []
        );

        setPagination(
          data.pagination || null
        );

        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load messages."
        );
      } finally {
        setLoading(false);
      }
    }, [
      page,
      search,
      status,
    ]);

  useEffect(() => {
    const timeout =
      setTimeout(() => {
        fetchMessages();
      }, 300);

    return () =>
      clearTimeout(timeout);
  }, [fetchMessages]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleOpenMessage =
    async (message) => {
      setSelectedMessage(
        message
      );

      // Automatically mark unread
      // messages as read when opened.
      if (
        message.status ===
        "Unread"
      ) {
        try {
          const response =
            await updateContactMessageStatus(
              message._id,
              "Read"
            );

          const updatedMessage =
            response.contactMessage ||
            {
              ...message,
              status: "Read",
            };

          setSelectedMessage(
            updatedMessage
          );

          setMessages(
            (previous) =>
              previous.map(
                (item) =>
                  item._id ===
                  message._id
                    ? updatedMessage
                    : item
              )
          );
        } catch (error) {
          console.error(
            "Unable to mark message as read:",
            error
          );
        }
      }
    };

  const handleStatusChange =
    async (newStatus) => {
      if (!selectedMessage) {
        return;
      }

      try {
        setUpdatingStatus(true);

        const response =
          await updateContactMessageStatus(
            selectedMessage._id,
            newStatus
          );

        const updatedMessage =
          response.contactMessage ||
          {
            ...selectedMessage,
            status: newStatus,
          };

        setSelectedMessage(
          updatedMessage
        );

        setMessages(
          (previous) =>
            previous.map(
              (message) =>
                message._id ===
                updatedMessage._id
                  ? updatedMessage
                  : message
            )
        );

        toast.success(
          `Message marked as ${newStatus.toLowerCase()}.`
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to update message status."
        );
      } finally {
        setUpdatingStatus(
          false
        );
      }
    };

  const handleDelete =
    async () => {
      if (!deleteTarget) {
        return;
      }

      try {
        setDeleting(true);

        await deleteContactMessage(
          deleteTarget._id
        );

        toast.success(
          "Message deleted successfully."
        );

        if (
          selectedMessage?._id ===
          deleteTarget._id
        ) {
          setSelectedMessage(
            null
          );
        }

        setDeleteTarget(null);

        await fetchMessages();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to delete message."
        );
      } finally {
        setDeleting(false);
      }
    };

  if (
    loading &&
    messages.length === 0
  ) {
    return (
      <LoadingSpinner text="Loading messages..." />
    );
  }

  if (
    error &&
    messages.length === 0
  ) {
    return (
      <ErrorState
        message={error}
        onRetry={fetchMessages}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Messages"
        description="View and manage messages submitted through your portfolio contact form."
      />

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search name, email or subject..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value
            )
          }
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500 md:w-48"
        >
          <option value="">
            All Statuses
          </option>

          <option value="Unread">
            Unread
          </option>

          <option value="Read">
            Read
          </option>

          <option value="Replied">
            Replied
          </option>
        </select>
      </div>

      {messages.length === 0 ? (
        <EmptyState
          icon={FiMail}
          title="No messages found"
          message={
            search || status
              ? "No messages match your current search or filter."
              : "Contact messages submitted through your portfolio will appear here."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-800 bg-slate-950/60">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">
                    Sender
                  </th>

                  <th className="px-5 py-4">
                    Subject
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {messages.map(
                  (message) => (
                    <tr
                      key={
                        message._id
                      }
                      className={`transition hover:bg-slate-900/70 ${
                        message.status ===
                        "Unread"
                          ? "bg-blue-500/[0.03]"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <p
                          className={`text-sm ${
                            message.status ===
                            "Unread"
                              ? "font-semibold text-white"
                              : "font-medium text-slate-300"
                          }`}
                        >
                          {
                            message.name
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            message.email
                          }
                        </p>
                      </td>

                      <td className="max-w-xs px-5 py-4">
                        <p
                          className={`truncate text-sm ${
                            message.status ===
                            "Unread"
                              ? "font-semibold text-slate-200"
                              : "text-slate-400"
                          }`}
                        >
                          {
                            message.subject
                          }
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                            statusStyles[
                              message.status
                            ] ||
                            statusStyles.Read
                          }`}
                        >
                          {
                            message.status
                          }
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {formatDate(
                          message.createdAt
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenMessage(
                                message
                              )
                            }
                            aria-label="View message"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-blue-500/40 hover:text-blue-400"
                          >
                            <FiEye />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(
                                message
                              )
                            }
                            aria-label="Delete message"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {pagination &&
            pagination.totalPages >
              1 && (
              <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 px-5 py-4 sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  {
                    pagination.currentPage
                  }{" "}
                  of{" "}
                  {
                    pagination.totalPages
                  }{" "}
                  •{" "}
                  {
                    pagination.totalMessages
                  }{" "}
                  messages
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={
                      !pagination.hasPreviousPage ||
                      loading
                    }
                    onClick={() =>
                      setPage(
                        (previous) =>
                          Math.max(
                            1,
                            previous -
                              1
                          )
                      )
                    }
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      !pagination.hasNextPage ||
                      loading
                    }
                    onClick={() =>
                      setPage(
                        (previous) =>
                          previous + 1
                      )
                    }
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
        </div>
      )}

      <MessageDetailsModal
        open={Boolean(
          selectedMessage
        )}
        message={
          selectedMessage
        }
        updating={
          updatingStatus
        }
        onClose={() =>
          setSelectedMessage(
            null
          )
        }
        onStatusChange={
          handleStatusChange
        }
      />

      <ConfirmModal
        open={Boolean(
          deleteTarget
        )}
        title="Delete message?"
        message={
          deleteTarget
            ? `Are you sure you want to delete the message from "${deleteTarget.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Message"
        danger
        loading={deleting}
        onCancel={() =>
          setDeleteTarget(
            null
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </>
  );
};

export default Messages;