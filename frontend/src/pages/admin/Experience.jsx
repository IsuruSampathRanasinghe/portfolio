import {
  useEffect,
  useState,
} from "react";

import {
  FiBriefcase,
  FiEdit2,
  FiExternalLink,
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

import ExperienceFormModal from "../../components/dashboard/ExperienceFormModal";

import {
  deleteExperience,
  getExperiences,
} from "../../services/experienceService";

import {
  formatMonthYear,
} from "../../utils/formatDate";

const Experience = () => {
  const [
    experiences,
    setExperiences,
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
    selectedExperience,
    setSelectedExperience,
  ] = useState(null);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const fetchExperiences =
    async () => {
      try {
        setLoading(true);

        const data =
          await getExperiences();

        setExperiences(
          data.experiences || []
        );

        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load experience."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const filteredExperiences =
    experiences.filter(
      (experience) => {
        const term =
          search
            .trim()
            .toLowerCase();

        if (!term) {
          return true;
        }

        return (
          experience.company
            ?.toLowerCase()
            .includes(term) ||
          experience.position
            ?.toLowerCase()
            .includes(term) ||
          experience.employmentType
            ?.toLowerCase()
            .includes(term) ||
          experience.location
            ?.toLowerCase()
            .includes(term)
        );
      }
    );

  const handleAdd = () => {
    setSelectedExperience(null);
    setFormOpen(true);
  };

  const handleEdit = (
    experience
  ) => {
    setSelectedExperience(
      experience
    );

    setFormOpen(true);
  };

  const handleDelete =
    async () => {
      if (!deleteTarget) {
        return;
      }

      try {
        setDeleting(true);

        await deleteExperience(
          deleteTarget._id
        );

        toast.success(
          "Experience deleted successfully."
        );

        setDeleteTarget(null);

        await fetchExperiences();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to delete experience."
        );
      } finally {
        setDeleting(false);
      }
    };

  if (
    loading &&
    experiences.length === 0
  ) {
    return (
      <LoadingSpinner text="Loading experience..." />
    );
  }

  if (
    error &&
    experiences.length === 0
  ) {
    return (
      <ErrorState
        message={error}
        onRetry={
          fetchExperiences
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Experience"
        description="Manage internships, employment and professional experience displayed on your portfolio."
        action={
          <button
            type="button"
            onClick={
              handleAdd
            }
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
          >
            <FiPlus />

            Add Experience
          </button>
        }
      />

      {/* Search */}
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
            placeholder="Search company, position, type or location..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-blue-500"
          />

        </div>

      </div>

      {/* Experience List */}
      {filteredExperiences.length ===
      0 ? (
        <EmptyState
          icon={FiBriefcase}
          title="No experience found"
          message={
            experiences.length === 0
              ? "Add internships, jobs or other professional experience."
              : "No experience matches your current search."
          }
          action={
            experiences.length ===
            0 ? (
              <button
                type="button"
                onClick={
                  handleAdd
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <FiPlus />

                Add Experience
              </button>
            ) : null
          }
        />
      ) : (
        <div className="space-y-5">

          {filteredExperiences.map(
            (experience) => (
              <article
                key={experience._id}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition duration-300 hover:border-blue-500/30"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                      <FiBriefcase />
                    </div>

                    <div>

                      <h2 className="font-[Poppins] text-lg font-semibold text-white">
                        {
                          experience.position
                        }
                      </h2>

                      <div className="mt-1 flex flex-wrap items-center gap-2">

                        <p className="font-medium text-blue-300">
                          {
                            experience.company
                          }
                        </p>

                        {experience.companyUrl && (
                          <a
                            href={
                              experience.companyUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 transition hover:text-blue-400"
                            aria-label="Open company website"
                          >
                            <FiExternalLink />
                          </a>
                        )}

                      </div>

                      {experience.employmentType && (
                        <span className="mt-3 inline-flex rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-400">
                          {
                            experience.employmentType
                          }
                        </span>
                      )}

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                        <span>
                          {formatMonthYear(
                            experience.startDate
                          )}

                          {" — "}

                          {experience.currentlyWorking
                            ? "Present"
                            : formatMonthYear(
                                experience.endDate
                              )}
                        </span>

                        {experience.location && (
                          <span className="flex items-center gap-1.5">
                            <FiMapPin />

                            {
                              experience.location
                            }
                          </span>
                        )}

                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 self-end md:self-start">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          experience
                        )
                      }
                      aria-label="Edit experience"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-blue-500/40 hover:text-blue-400"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget(
                          experience
                        )
                      }
                      aria-label="Delete experience"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

                {/* Description */}
                {experience.description && (
                  <p className="mt-5 border-t border-slate-800 pt-5 text-sm leading-7 text-slate-500">
                    {
                      experience.description
                    }
                  </p>
                )}

                {/* Technologies */}
                {experience.technologies
                  ?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">

                    {experience.technologies.map(
                      (technology) => (
                        <span
                          key={
                            technology
                          }
                          className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-medium text-blue-300"
                        >
                          {
                            technology
                          }
                        </span>
                      )
                    )}

                  </div>
                )}

                <div className="mt-5 text-xs text-slate-600">
                  Display order:{" "}
                  {
                    experience.displayOrder
                  }
                </div>

              </article>
            )
          )}

        </div>
      )}

      {/* Add/Edit Modal */}
      <ExperienceFormModal
        open={formOpen}
        experience={
          selectedExperience
        }
        onClose={() => {
          setFormOpen(false);

          setSelectedExperience(
            null
          );
        }}
        onSuccess={
          fetchExperiences
        }
      />

      {/* Delete Modal */}
      <ConfirmModal
        open={Boolean(
          deleteTarget
        )}
        title="Delete experience?"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.position}" at "${deleteTarget.company}"?`
            : ""
        }
        confirmText="Delete Experience"
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

export default Experience;