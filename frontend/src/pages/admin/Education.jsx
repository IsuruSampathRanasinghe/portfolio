import {
  useEffect,
  useState,
} from "react";

import {
  FiBookOpen,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import ConfirmModal from "../../components/common/ConfirmModal";

import EducationFormModal from "../../components/dashboard/EducationFormModal";

import {
  deleteEducation,
  getEducation,
} from "../../services/educationService";

import {
  formatMonthYear,
} from "../../utils/formatDate";

const Education = () => {
  const [
    education,
    setEducation,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    selectedEducation,
    setSelectedEducation,
  ] = useState(null);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const fetchEducation =
    async () => {
      try {
        setLoading(true);

        const data =
          await getEducation();

        setEducation(
          data.education || []
        );

        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load education records."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchEducation();
  }, []);

  const filteredEducation =
    education.filter(
      (item) => {
        const term =
          search
            .trim()
            .toLowerCase();

        if (!term) {
          return true;
        }

        return (
          item.institution
            ?.toLowerCase()
            .includes(term) ||
          item.degree
            ?.toLowerCase()
            .includes(term) ||
          item.fieldOfStudy
            ?.toLowerCase()
            .includes(term)
        );
      }
    );

  const handleAdd = () => {
    setSelectedEducation(null);
    setFormOpen(true);
  };

  const handleEdit = (
    item
  ) => {
    setSelectedEducation(item);
    setFormOpen(true);
  };

  const handleDelete =
    async () => {
      if (!deleteTarget) {
        return;
      }

      try {
        setDeleting(true);

        await deleteEducation(
          deleteTarget._id
        );

        toast.success(
          "Education record deleted successfully."
        );

        setDeleteTarget(null);

        await fetchEducation();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to delete education record."
        );
      } finally {
        setDeleting(false);
      }
    };

  if (
    loading &&
    education.length === 0
  ) {
    return (
      <LoadingSpinner text="Loading education..." />
    );
  }

  if (
    error &&
    education.length === 0
  ) {
    return (
      <ErrorState
        message={error}
        onRetry={
          fetchEducation
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Education"
        description="Manage your academic history displayed on the portfolio."
        action={
          <button
            type="button"
            onClick={
              handleAdd
            }
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
          >
            <FiPlus />

            Add Education
          </button>
        }
      />

      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search institution, degree or field..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {filteredEducation.length ===
      0 ? (
        <EmptyState
          icon={FiBookOpen}
          title="No education records found"
          message={
            education.length === 0
              ? "Add your academic background to your portfolio."
              : "No education records match your current search."
          }
          action={
            education.length === 0 ? (
              <button
                type="button"
                onClick={
                  handleAdd
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <FiPlus />

                Add Education
              </button>
            ) : null
          }
        />
      ) : (
        <div className="space-y-5">
          {filteredEducation.map(
            (item) => (
              <article
                key={item._id}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition duration-300 hover:border-blue-500/30"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                      <FiBookOpen />
                    </div>

                    <div>
                      <h2 className="font-[Poppins] text-lg font-semibold text-white">
                        {item.degree}
                      </h2>

                      {item.fieldOfStudy && (
                        <p className="mt-1 text-sm font-medium text-blue-300">
                          {
                            item.fieldOfStudy
                          }
                        </p>
                      )}

                      <p className="mt-3 font-medium text-slate-300">
                        {
                          item.institution
                        }
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <span>
                          {formatMonthYear(
                            item.startDate
                          )}

                          {" — "}

                          {item.currentlyStudying
                            ? "Present"
                            : formatMonthYear(
                                item.endDate
                              )}
                        </span>

                        {item.location && (
                          <span className="flex items-center gap-1.5">
                            <FiMapPin />

                            {
                              item.location
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 self-end md:self-start">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                      aria-label="Edit education"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-blue-500/40 hover:text-blue-400"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget(
                          item
                        )
                      }
                      aria-label="Delete education"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                {item.description && (
                  <p className="mt-5 border-t border-slate-800 pt-5 text-sm leading-7 text-slate-500">
                    {
                      item.description
                    }
                  </p>
                )}

                <div className="mt-4 text-xs text-slate-600">
                  Display order:{" "}
                  {
                    item.displayOrder
                  }
                </div>
              </article>
            )
          )}
        </div>
      )}

      <EducationFormModal
        open={formOpen}
        education={
          selectedEducation
        }
        onClose={() => {
          setFormOpen(false);
          setSelectedEducation(
            null
          );
        }}
        onSuccess={
          fetchEducation
        }
      />

      <ConfirmModal
        open={Boolean(
          deleteTarget
        )}
        title="Delete education record?"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.degree}" from ${deleteTarget.institution}?`
            : ""
        }
        confirmText="Delete Education"
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

export default Education;