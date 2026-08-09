import {
  useEffect,
  useState,
} from "react";

import {
  FiCode,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import ConfirmModal from "../../components/common/ConfirmModal";

import SkillFormModal from "../../components/dashboard/SkillFormModal";

import {
  deleteSkill,
  getSkills,
} from "../../services/skillService";

import {
  getSkillIcon,
} from "../../utils/skillIcons";

const Skills = () => {
  const [skills, setSkills] =
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
    selectedSkill,
    setSelectedSkill,
  ] = useState(null);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const fetchSkills =
    async () => {
      try {
        setLoading(true);

        const data =
          await getSkills();

        setSkills(
          data.skills || []
        );

        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load skills."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSkills();
  }, []);

  const categories = [
    ...new Set(
      skills
        .map(
          (skill) =>
            skill.category
        )
        .filter(Boolean)
    ),
  ];

  const filteredSkills =
    skills.filter((skill) => {
      const matchesSearch =
        !search ||
        skill.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        !category ||
        skill.category ===
          category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  const handleAdd = () => {
    setSelectedSkill(null);
    setFormOpen(true);
  };

  const handleEdit = (
    skill
  ) => {
    setSelectedSkill(skill);
    setFormOpen(true);
  };

  const handleDelete =
    async () => {
      if (!deleteTarget) {
        return;
      }

      try {
        setDeleting(true);

        await deleteSkill(
          deleteTarget._id
        );

        toast.success(
          "Skill deleted successfully."
        );

        setDeleteTarget(null);

        await fetchSkills();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to delete skill."
        );
      } finally {
        setDeleting(false);
      }
    };

  if (
    loading &&
    skills.length === 0
  ) {
    return (
      <LoadingSpinner text="Loading skills..." />
    );
  }

  if (
    error &&
    skills.length === 0
  ) {
    return (
      <ErrorState
        message={error}
        onRetry={fetchSkills}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Skills"
        description="Manage the technologies and skills displayed on your portfolio."
        action={
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
          >
            <FiPlus />

            Add Skill
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
            placeholder="Search skills..."
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
          className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500 md:w-56"
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

      {filteredSkills.length ===
      0 ? (
        <EmptyState
          icon={FiCode}
          title="No skills found"
          message={
            skills.length === 0
              ? "Add your first technical skill."
              : "No skills match your current search or filter."
          }
          action={
            skills.length === 0 ? (
              <button
                type="button"
                onClick={
                  handleAdd
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <FiPlus />

                Add Skill
              </button>
            ) : null
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {filteredSkills.map(
            (skill) => {
              const SkillIcon =
                getSkillIcon(
                  skill.icon
                );

              return (
                <article
                  key={skill._id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition duration-300 hover:border-blue-500/30"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-2xl text-blue-400">

                        {SkillIcon ? (
                          <SkillIcon />
                        ) : (
                          <span className="text-sm font-bold">
                            {skill.name
                              ?.split(
                                " "
                              )
                              .map(
                                (
                                  word
                                ) =>
                                  word[0]
                              )
                              .slice(
                                0,
                                2
                              )
                              .join(
                                ""
                              )
                              .toUpperCase()}
                          </span>
                        )}

                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-[Poppins] font-semibold text-white">
                            {
                              skill.name
                            }
                          </h2>

                          {skill.featured && (
                            <FiStar className="text-amber-400" />
                          )}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            skill.category
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            skill
                          )
                        }
                        aria-label={`Edit ${skill.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget(
                            skill
                          )
                        }
                        aria-label={`Delete ${skill.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">

                      <span className="text-slate-500">
                        Proficiency
                      </span>

                      <span className="font-semibold text-blue-400">
                        {
                          skill.proficiency
                        }
                        %
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        style={{
                          width: `${skill.proficiency}%`,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">

                    <span>
                      Order:{" "}
                      {
                        skill.displayOrder
                      }
                    </span>

                    <span>
                      {skill.featured
                        ? "Featured"
                        : "Standard"}
                    </span>

                  </div>
                </article>
              );
            }
          )}

        </div>
      )}

      <SkillFormModal
        open={formOpen}
        skill={selectedSkill}
        onClose={() => {
          setFormOpen(false);
          setSelectedSkill(
            null
          );
        }}
        onSuccess={
          fetchSkills
        }
      />

      <ConfirmModal
        open={Boolean(
          deleteTarget
        )}
        title="Delete skill?"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? It will be removed from your public portfolio.`
            : ""
        }
        confirmText="Delete Skill"
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

export default Skills;