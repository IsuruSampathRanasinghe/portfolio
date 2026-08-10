import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
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

  const dialogRef =
    useRef(null);

  const firstInputRef =
    useRef(null);

  const previousActiveElement =
    useRef(null);

  const shouldReduceMotion =
    useReducedMotion();

  const isEditing =
    Boolean(skill);

  useEffect(() => {
    if (skill) {
      setForm({
        name:
          skill.name || "",

        category:
          skill.category ||
          "Frontend",

        proficiency:
          skill.proficiency ??
          80,

        icon:
          skill.icon || "",

        displayOrder:
          skill.displayOrder ??
          0,

        featured:
          skill.featured ||
          false,
      });
    } else {
      setForm(
        initialForm
      );
    }
  }, [
    skill,
    open,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Focus Management
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!open) {
      return;
    }

    previousActiveElement.current =
      document.activeElement;

    const timer =
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);

    const handleKeyDown = (
      event
    ) => {
      /*
      |--------------------------------------------------------------------------
      | Escape
      |--------------------------------------------------------------------------
      */

      if (
        event.key ===
          "Escape" &&
        !saving
      ) {
        onClose();
        return;
      }

      /*
      |--------------------------------------------------------------------------
      | Focus Trap
      |--------------------------------------------------------------------------
      */

      if (
        event.key !==
          "Tab" ||
        !dialogRef.current
      ) {
        return;
      }

      const focusableElements =
        dialogRef.current.querySelectorAll(
          [
            'button:not([disabled])',
            '[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(",")
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

      previousActiveElement.current
        ?.focus?.();
    };
  }, [
    open,
    saving,
    onClose,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Prevent background scrolling
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | Form Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,

        [name]:
          type ===
          "checkbox"
            ? checked
            : name ===
                  "proficiency" ||
                name ===
                  "displayOrder"
              ? Number(
                  value
                )
              : value,
      })
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (
        !form.name.trim()
      ) {
        toast.error(
          "Skill name is required."
        );

        firstInputRef.current?.focus();

        return;
      }

      try {
        setSaving(true);

        const payload = {
          ...form,

          name:
            form.name.trim(),

          icon:
            form.icon.trim(),
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

        await onSuccess?.();

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
    getSkillIcon(
      form.icon
    );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] overflow-y-auto px-4 py-6">
          {/* Background overlay */}
          <motion.button
            type="button"
            aria-label="Close skill dialog"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                  }
            }
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                  }
            }
            onClick={
              saving
                ? undefined
                : onClose
            }
            className="fixed inset-0 cursor-default bg-black/75 backdrop-blur-sm"
          />

          {/* Modal positioning */}
          <div className="flex min-h-full items-start justify-center sm:items-center">
            {/* Modal */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-modal-title"
              aria-describedby="skill-modal-description"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: 20,
                    }
              }
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }
              }
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.96,
                      y: 20,
                    }
              }
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      duration: 0.2,
                    }
              }
              className="relative z-10 my-4 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur">
                <div>
                  <h2
                    id="skill-modal-title"
                    className="font-[Poppins] text-xl font-semibold text-white"
                  >
                    {isEditing
                      ? "Edit Skill"
                      : "Add Skill"}
                  </h2>

                  <p
                    id="skill-modal-description"
                    className="mt-1 text-sm text-slate-500"
                  >
                    Manage skill
                    information
                    displayed on your
                    portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    onClose
                  }
                  disabled={
                    saving
                  }
                  aria-label="Close skill dialog"
                  className="rounded-xl p-2 text-xl text-slate-500 outline-none transition hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiX
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={
                  handleSubmit
                }
                aria-busy={
                  saving
                }
                className="space-y-6 p-6"
              >
                {/* Skill Name */}
                <div>
                  <label
                    htmlFor="skill-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Skill Name{" "}
                    <span
                      aria-hidden="true"
                      className="text-red-400"
                    >
                      *
                    </span>
                  </label>

                  <input
                    ref={
                      firstInputRef
                    }
                    id="skill-name"
                    name="name"
                    type="text"
                    value={
                      form.name
                    }
                    onChange={
                      handleChange
                    }
                    required
                    autoComplete="off"
                    placeholder="React"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="skill-category"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Category{" "}
                    <span
                      aria-hidden="true"
                      className="text-red-400"
                    >
                      *
                    </span>
                  </label>

                  <select
                    id="skill-category"
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {categories.map(
                      (
                        category
                      ) => (
                        <option
                          key={
                            category
                          }
                          value={
                            category
                          }
                        >
                          {
                            category
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Proficiency */}
                <div>
                  <div className="mb-2 flex justify-between gap-4">
                    <label
                      htmlFor="skill-proficiency"
                      className="text-sm font-medium text-slate-300"
                    >
                      Proficiency
                    </label>

                    <span
                      id="skill-proficiency-value"
                      className="text-sm font-semibold text-blue-400"
                    >
                      {
                        form.proficiency
                      }
                      %
                    </span>
                  </div>

                  <input
                    id="skill-proficiency"
                    type="range"
                    name="proficiency"
                    min="0"
                    max="100"
                    step="1"
                    value={
                      form.proficiency
                    }
                    onChange={
                      handleChange
                    }
                    aria-valuemin={
                      0
                    }
                    aria-valuemax={
                      100
                    }
                    aria-valuenow={
                      form.proficiency
                    }
                    aria-valuetext={`${form.proficiency} percent`}
                    aria-describedby="skill-proficiency-value"
                    className="w-full rounded accent-blue-500 outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  />

                  <div
                    aria-hidden="true"
                    className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"
                  >
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
                  <label
                    htmlFor="skill-icon"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Icon Name
                  </label>

                  <div className="flex gap-3">
                    <input
                      id="skill-icon"
                      name="icon"
                      type="text"
                      value={
                        form.icon
                      }
                      onChange={
                        handleChange
                      }
                      aria-describedby="skill-icon-help"
                      autoComplete="off"
                      placeholder="react"
                      className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />

                    <div
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-2xl text-blue-400"
                    >
                      {SkillIcon ? (
                        <SkillIcon />
                      ) : (
                        <span className="text-xs font-semibold text-slate-500">
                          ?
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    id="skill-icon-help"
                    className="mt-2 text-xs text-slate-500"
                  >
                    Examples: react,
                    javascript,
                    nodejs, mongodb,
                    postgresql,
                    docker.
                  </p>
                </div>

                {/* Display Order */}
                <div>
                  <label
                    htmlFor="skill-display-order"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Display Order
                  </label>

                  <input
                    id="skill-display-order"
                    type="number"
                    name="displayOrder"
                    min="0"
                    value={
                      form.displayOrder
                    }
                    onChange={
                      handleChange
                    }
                    aria-describedby="skill-display-order-help"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <p
                    id="skill-display-order-help"
                    className="mt-2 text-xs text-slate-500"
                  >
                    Lower numbers
                    appear first.
                  </p>
                </div>

                {/* Featured */}
                <label
                  htmlFor="skill-featured"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 outline-none transition focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20"
                >
                  <input
                    id="skill-featured"
                    type="checkbox"
                    name="featured"
                    checked={
                      form.featured
                    }
                    onChange={
                      handleChange
                    }
                    className="h-4 w-4 rounded accent-blue-500 outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Featured
                      Skill
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Mark this as
                      one of your
                      primary skills.
                    </p>
                  </div>
                </label>

                {/* Actions */}
                <div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t border-slate-800 bg-slate-950/95 px-6 pb-1 pt-5 backdrop-blur">
                  <button
                    type="button"
                    onClick={
                      onClose
                    }
                    disabled={
                      saving
                    }
                    className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 outline-none transition hover:border-slate-500 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      saving
                    }
                    aria-disabled={
                      saving
                    }
                    aria-busy={
                      saving
                    }
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : isEditing
                        ? "Update Skill"
                        : "Create Skill"}
                  </button>
                </div>

                <span
                  aria-live="polite"
                  className="sr-only"
                >
                  {saving
                    ? isEditing
                      ? "Updating skill."
                      : "Creating skill."
                    : ""}
                </span>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SkillFormModal;