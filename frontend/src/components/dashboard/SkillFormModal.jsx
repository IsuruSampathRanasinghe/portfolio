import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  createSkill,
  updateSkill,
} from "../../services/skillService";

import {
  getSkillIcon,
} from "../../utils/skillIcons";

const initialForm = {
  name: "",
  category: "Frontend",
  proficiency: 80,
  icon: "",
  displayOrder: 0,
  featured: false,
};

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Programming Language",
  "Tools",
  "Cloud",
  "Other",
];

const SkillFormModal = ({
  open,
  skill,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] =
    useState(initialForm);

  const [saving, setSaving] =
    useState(false);

  const isEditing = Boolean(skill);

  useEffect(() => {
    if (skill) {
      setForm({
        name: skill.name || "",
        category:
          skill.category ||
          "Frontend",
        proficiency:
          skill.proficiency ?? 80,
        icon: skill.icon || "",
        displayOrder:
          skill.displayOrder ?? 0,
        featured:
          skill.featured || false,
      });
    } else {
      setForm(initialForm);
    }
  }, [skill, open]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : name ===
                "proficiency" ||
              name ===
                "displayOrder"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error(
        "Skill name is required."
      );

      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        name: form.name.trim(),
        icon: form.icon.trim(),
      };

      if (isEditing) {
        await updateSkill(
          skill._id,
          payload
        );

        toast.success(
          "Skill updated successfully."
        );
      } else {
        await createSkill(
          payload
        );

        toast.success(
          "Skill created successfully."
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to save skill."
      );
    } finally {
      setSaving(false);
    }
  };

  const SkillIcon =
    getSkillIcon(form.icon);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] overflow-y-auto px-4 py-6">

          {/* Background overlay */}
          <motion.button
            type="button"
            aria-label="Close modal"
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
              saving
                ? undefined
                : onClose
            }
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal positioning */}
          <div className="flex min-h-full items-start justify-center sm:items-center">

            {/* Modal */}
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
              className="relative z-10 my-4 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
            >

              {/* Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur">

                <div>
                  <h2 className="font-[Poppins] text-xl font-semibold text-white">
                    {isEditing
                      ? "Edit Skill"
                      : "Add Skill"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage skill information
                    displayed on your
                    portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-xl p-2 text-xl text-slate-500 transition hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6"
              >
                {/* Skill Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Skill Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    placeholder="React"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    {categories.map(
                      (category) => (
                        <option
                          key={
                            category
                          }
                          value={
                            category
                          }
                        >
                          {category}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Proficiency */}
                <div>
                  <div className="mb-2 flex justify-between">
                    <label className="text-sm font-medium text-slate-300">
                      Proficiency
                    </label>

                    <span className="text-sm font-semibold text-blue-400">
                      {
                        form.proficiency
                      }
                      %
                    </span>
                  </div>

                  <input
                    type="range"
                    name="proficiency"
                    min="0"
                    max="100"
                    value={
                      form.proficiency
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full accent-blue-500"
                  />

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      style={{
                        width: `${form.proficiency}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                    />
                  </div>
                </div>

                {/* Icon */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Icon Name
                  </label>

                  <div className="flex gap-3">
                    <input
                      name="icon"
                      value={form.icon}
                      onChange={
                        handleChange
                      }
                      placeholder="react"
                      className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-2xl text-blue-400">
                      {SkillIcon ? (
                        <SkillIcon />
                      ) : (
                        <span className="text-xs font-semibold text-slate-500">
                          ?
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Examples: react,
                    javascript, nodejs,
                    mongodb, postgresql,
                    docker.
                  </p>
                </div>

                {/* Display Order */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="displayOrder"
                    min="0"
                    value={
                      form.displayOrder
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-blue-500"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Lower numbers appear
                    first.
                  </p>
                </div>

                {/* Featured */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      form.featured
                    }
                    onChange={
                      handleChange
                    }
                    className="h-4 w-4 accent-blue-500"
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Featured Skill
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Mark this as one of
                      your primary skills.
                    </p>
                  </div>
                </label>

                {/* Buttons */}
                <div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-slate-800 bg-slate-950/95 px-6 pb-1 pt-5 backdrop-blur">

                  <button
                    type="button"
                    onClick={onClose}
                    disabled={saving}
                    className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : isEditing
                        ? "Update Skill"
                        : "Create Skill"}
                  </button>

                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SkillFormModal;