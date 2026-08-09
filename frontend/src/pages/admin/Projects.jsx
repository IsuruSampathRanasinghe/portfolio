import {
  useEffect,
  useState,
} from "react";

import {
  FiEdit2,
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
import ProjectFormModal from "../../components/dashboard/ProjectFormModal";

import {
  deleteProject,
  getProjects,
} from "../../services/projectService";

const Projects = () => {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState(null);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const fetchProjects =
    async () => {
      try {
        setLoading(true);

        const data =
          await getProjects({
            limit: 50,
            sort: "latest",
          });

        setProjects(
          data.projects || []
        );

        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = [
    ...new Set(
      projects
        .map(
          (project) =>
            project.category
        )
        .filter(Boolean)
    ),
  ];

  const filteredProjects =
    projects.filter(
      (project) => {
        const matchesSearch =
          !search ||
          project.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          project.description
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          !category ||
          project.category ===
            category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  const handleAdd = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };

  const handleEdit = (
    project
  ) => {
    setSelectedProject(project);
    setFormOpen(true);
  };

  const handleDelete =
    async () => {
      if (!deleteTarget) {
        return;
      }

      try {
        setDeleting(true);

        await deleteProject(
          deleteTarget._id
        );

        toast.success(
          "Project deleted successfully."
        );

        setDeleteTarget(null);

        await fetchProjects();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to delete project."
        );
      } finally {
        setDeleting(false);
      }
    };

  if (
    loading &&
    projects.length === 0
  ) {
    return (
      <LoadingSpinner text="Loading projects..." />
    );
  }

  if (
    error &&
    projects.length === 0
  ) {
    return (
      <ErrorState
        message={error}
        onRetry={
          fetchProjects
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Projects"
        description="Create, update and manage the projects displayed on your portfolio."
        action={
          <button
            type="button"
            onClick={
              handleAdd
            }
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
          >
            <FiPlus />

            Add Project
          </button>
        }
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
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value
            )
          }
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500 md:w-52"
        >
          <option value="">
            All Categories
          </option>

          {categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      {filteredProjects.length ===
      0 ? (
        <EmptyState
          title="No projects found"
          message={
            projects.length === 0
              ? "Create your first portfolio project."
              : "No projects match the current search or filter."
          }
          action={
            projects.length === 0 ? (
              <button
                type="button"
                onClick={
                  handleAdd
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <FiPlus />

                Add Project
              </button>
            ) : null
          }
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredProjects.map(
            (project) => (
              <article
                key={project._id}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50"
              >
                <div className="grid sm:grid-cols-[180px_1fr]">
                  <div className="min-h-44 bg-slate-950">
                    {project.image
                      ?.url ? (
                      <img
                        src={
                          project.image
                            .url
                        }
                        alt={
                          project.title
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-44 items-center justify-center text-sm text-slate-600">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                          {
                            project.category
                          }
                        </p>

                        <h2 className="mt-2 font-[Poppins] text-lg font-semibold text-white">
                          {
                            project.title
                          }
                        </h2>
                      </div>

                      {project.featured && (
                        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {
                        project.description
                      }
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {
                          project.status
                        }
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              project
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-blue-500/40 hover:text-blue-400"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget(
                              project
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}

      <ProjectFormModal
        open={formOpen}
        project={
          selectedProject
        }
        onClose={() => {
          setFormOpen(false);
          setSelectedProject(null);
        }}
        onSuccess={
          fetchProjects
        }
      />

      <ConfirmModal
        open={Boolean(
          deleteTarget
        )}
        title="Delete project?"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? Its Cloudinary image will also be removed.`
            : ""
        }
        confirmText="Delete Project"
        danger
        loading={deleting}
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={
          handleDelete
        }
      />
    </>
  );
};

export default Projects;