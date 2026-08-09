import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiPlus,
  FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  createExperience,
  updateExperience,
} from "../../services/experienceService";

const initialForm = {
  company: "",
  position: "",
  employmentType: "Internship",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
  technologies: [],
  companyUrl: "",
  displayOrder: 0,
};

const employmentTypes = [
  "Internship",
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Trainee",
  "Volunteer",
  "Other",
];

const formatDateForInput = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate
    .toISOString()
    .split("T")[0];
};

const ExperienceFormModal = ({
  open,
  experience,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] =
    useState(initialForm);

  const [technology, setTechnology] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const isEditing =
    Boolean(experience);

  useEffect(() => {
    if (experience) {
      setForm({
        company:
          experience.company || "",

        position:
          experience.position || "",

        employmentType:
          experience.employmentType ||
          "Internship",

        location:
          experience.location || "",

        startDate:
          formatDateForInput(
            experience.startDate
          ),

        endDate:
          formatDateForInput(
            experience.endDate
          ),

        currentlyWorking:
          experience.currentlyWorking ||
          false,

        description:
          experience.description || "",

        technologies:
          Array.isArray(
            experience.technologies
          )
            ? experience.technologies
            : [],

        companyUrl:
          experience.companyUrl || "",

        displayOrder:
          experience.displayOrder ?? 0,
      });
    } else {
      setForm(initialForm);
    }

    setTechnology("");
  }, [experience, open]);

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
          : name === "displayOrder"
            ? Number(value)
            : value,
    }));
  };

  const handleCurrentWorkingChange = (
    event
  ) => {
    const checked =
      event.target.checked;

    setForm((previous) => ({
      ...previous,

      currentlyWorking: checked,

      endDate: checked
        ? ""
        : previous.endDate,
    }));
  };

  const addTechnology = () => {
    const value =
      technology.trim();

    if (!value) {
      return;
    }

    const exists =
      form.technologies.some(
        (item) =>
          item.toLowerCase() ===
          value.toLowerCase()
      );

    if (exists) {
      toast.error(
        "Technology already added."
      );

      return;
    }

    setForm((previous) => ({
      ...previous,

      technologies: [
        ...previous.technologies,
        value,
      ],
    }));

    setTechnology("");
  };

  const removeTechnology = (
    item
  ) => {
    setForm((previous) => ({
      ...previous,

      technologies:
        previous.technologies.filter(
          (technology) =>
            technology !== item
        ),
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !form.company.trim() ||
      !form.position.trim() ||
      !form.startDate
    ) {
      toast.error(
        "Company, position and start date are required."
      );

      return;
    }

    if (
      !form.currentlyWorking &&
      form.endDate &&
      new Date(form.endDate) <
        new Date(form.startDate)
    ) {
      toast.error(
        "End date cannot be earlier than start date."
      );

      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,

        company:
          form.company.trim(),

        position:
          form.position.trim(),

        location:
          form.location.trim(),

        description:
          form.description.trim(),

        companyUrl:
          form.companyUrl.trim(),

        endDate:
          form.currentlyWorking
            ? null
            : form.endDate || null,
      };

      if (isEditing) {
        await updateExperience(
          experience._id,
          payload
        );

        toast.success(
          "Experience updated successfully."
        );
      } else {
        await createExperience(
          payload
        );

        toast.success(
          "Experience created successfully."
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to save experience."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">

          {/* Overlay */}
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
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

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
            className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur">

              <div>
                <h2 className="font-[Poppins] text-xl font-semibold text-white">
                  {isEditing
                    ? "Edit Experience"
                    : "Add Experience"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your professional
                  experience.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-xl p-2 text-xl text-slate-500 transition hover:bg-slate-900 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* Company */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Company *
                </label>

                <input
                  name="company"
                  value={form.company}
                  onChange={
                    handleChange
                  }
                  placeholder="Company Name"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Position + Employment Type */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Position *
                  </label>

                  <input
                    name="position"
                    value={
                      form.position
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Software Engineer Intern"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Employment Type
                  </label>

                  <select
                    name="employmentType"
                    value={
                      form.employmentType
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    {employmentTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Location
                </label>

                <input
                  name="location"
                  value={
                    form.location
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Colombo, Sri Lanka / Remote"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Dates */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Start Date *
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={
                      form.startDate
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={
                      form.endDate
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      form.currentlyWorking
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </div>

              </div>

              {/* Currently Working */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                <input
                  type="checkbox"
                  checked={
                    form.currentlyWorking
                  }
                  onChange={
                    handleCurrentWorkingChange
                  }
                  className="h-4 w-4 accent-blue-500"
                />

                <div>
                  <p className="text-sm font-medium text-slate-300">
                    I currently work here
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    The portfolio will
                    display "Present"
                    instead of an end date.
                  </p>
                </div>

              </label>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                  rows="5"
                  placeholder="Describe your responsibilities, contributions and achievements..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Technologies
                </label>

                <div className="flex gap-2">

                  <input
                    value={
                      technology
                    }
                    onChange={(event) =>
                      setTechnology(
                        event.target.value
                      )
                    }
                    onKeyDown={(
                      event
                    ) => {
                      if (
                        event.key ===
                        "Enter"
                      ) {
                        event.preventDefault();
                        addTechnology();
                      }
                    }}
                    placeholder="React"
                    className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={
                      addTechnology
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white transition hover:bg-blue-400"
                  >
                    <FiPlus />
                  </button>

                </div>

                {form.technologies.length >
                  0 && (
                  <div className="mt-4 flex flex-wrap gap-2">

                    {form.technologies.map(
                      (item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300"
                        >
                          {item}

                          <button
                            type="button"
                            onClick={() =>
                              removeTechnology(
                                item
                              )
                            }
                            className="text-slate-500 transition hover:text-red-400"
                          >
                            <FiX />
                          </button>
                        </span>
                      )
                    )}

                  </div>
                )}
              </div>

              {/* Company URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Company Website
                </label>

                <input
                  type="url"
                  name="companyUrl"
                  value={
                    form.companyUrl
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://company.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Display Order
                </label>

                <input
                  type="number"
                  min="0"
                  name="displayOrder"
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

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-800 pt-6">

                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
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
                      ? "Update Experience"
                      : "Create Experience"}
                </button>

              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExperienceFormModal;