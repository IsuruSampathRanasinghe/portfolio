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
  createEducation,
  updateEducation,
} from "../../services/educationService";

const initialForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  description: "",
  location: "",
  displayOrder: 0,
};

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

const EducationFormModal = ({
  open,
  education,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] =
    useState(initialForm);

  const [saving, setSaving] =
    useState(false);

  const isEditing =
    Boolean(education);

  useEffect(() => {
    if (education) {
      setForm({
        institution:
          education.institution ||
          "",

        degree:
          education.degree || "",

        fieldOfStudy:
          education.fieldOfStudy ||
          "",

        startDate:
          formatDateForInput(
            education.startDate
          ),

        endDate:
          formatDateForInput(
            education.endDate
          ),

        currentlyStudying:
          education.currentlyStudying ||
          false,

        description:
          education.description ||
          "",

        location:
          education.location || "",

        displayOrder:
          education.displayOrder ?? 0,
      });
    } else {
      setForm(initialForm);
    }
  }, [education, open]);

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
              "displayOrder"
            ? Number(value)
            : value,
    }));
  };

  const handleCurrentStudyChange = (
    event
  ) => {
    const checked =
      event.target.checked;

    setForm((previous) => ({
      ...previous,
      currentlyStudying:
        checked,

      endDate:
        checked
          ? ""
          : previous.endDate,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !form.institution.trim() ||
      !form.degree.trim() ||
      !form.startDate
    ) {
      toast.error(
        "Institution, degree and start date are required."
      );

      return;
    }

    if (
      !form.currentlyStudying &&
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

        institution:
          form.institution.trim(),

        degree:
          form.degree.trim(),

        fieldOfStudy:
          form.fieldOfStudy.trim(),

        description:
          form.description.trim(),

        location:
          form.location.trim(),

        endDate:
          form.currentlyStudying
            ? null
            : form.endDate || null,
      };

      if (isEditing) {
        await updateEducation(
          education._id,
          payload
        );

        toast.success(
          "Education updated successfully."
        );
      } else {
        await createEducation(
          payload
        );

        toast.success(
          "Education created successfully."
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to save education record."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
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
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur">
              <div>
                <h2 className="font-[Poppins] text-xl font-semibold text-white">
                  {isEditing
                    ? "Edit Education"
                    : "Add Education"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your academic
                  history.
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

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Institution *
                </label>

                <input
                  name="institution"
                  value={
                    form.institution
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Eastern University of Sri Lanka"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Degree *
                  </label>

                  <input
                    name="degree"
                    value={
                      form.degree
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Bachelor's Degree"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Field of Study
                  </label>

                  <input
                    name="fieldOfStudy"
                    value={
                      form.fieldOfStudy
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Computer Science"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>
              </div>

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
                    disabled={
                      form.currentlyStudying
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <input
                  type="checkbox"
                  checked={
                    form.currentlyStudying
                  }
                  onChange={
                    handleCurrentStudyChange
                  }
                  className="h-4 w-4 accent-blue-500"
                />

                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Currently studying
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    The public portfolio
                    will display
                    "Present".
                  </p>
                </div>
              </label>

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
                  placeholder="Sri Lanka"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

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
                  placeholder="Describe your studies, relevant coursework, achievements..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

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
                  Lower numbers are
                  displayed first.
                </p>
              </div>

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
                      ? "Update Education"
                      : "Create Education"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EducationFormModal;