import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiImage,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  createProject,
  updateProject,
} from "../../services/projectService";

import {
  uploadImage,
  deleteImage,
} from "../../services/uploadService";

const initialForm = {
  title: "",
  description: "",
  category: "Web Development",
  status: "Completed",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  technologies: [],
  image: {
    url: "",
    publicId: "",
  },
};

const ProjectFormModal = ({
  open,
  project,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] =
    useState(initialForm);

  const [technology, setTechnology] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const isEditing = Boolean(project);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description:
          project.description || "",
        category:
          project.category ||
          "Web Development",
        status:
          project.status ||
          "Completed",
        githubUrl:
          project.githubUrl || "",
        liveUrl:
          project.liveUrl || "",
        featured:
          project.featured || false,
        technologies:
          project.technologies || [],
        image: {
          url:
            project.image?.url ||
            "",
          publicId:
            project.image?.publicId ||
            "",
        },
      });

      setPreview(
        project.image?.url || ""
      );
    } else {
      setForm(initialForm);
      setPreview("");
    }

    setImageFile(null);
    setTechnology("");
  }, [project, open]);

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const objectUrl =
      URL.createObjectURL(imageFile);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(
        objectUrl
      );
    };
  }, [imageFile]);

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
          : value,
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
      setTechnology("");
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
      !form.title.trim() ||
      !form.description.trim()
    ) {
      toast.error(
        "Title and description are required."
      );

      return;
    }

    try {
      setSaving(true);

      let imageData = form.image;

      if (imageFile) {
        const uploadResult =
          await uploadImage(
            imageFile
          );

        imageData = {
          url:
            uploadResult.image.url,
          publicId:
            uploadResult.image
              .publicId,
        };
      }

      const payload = {
        ...form,
        title: form.title.trim(),
        description:
          form.description.trim(),
        image: imageData,
      };

      if (isEditing) {
        await updateProject(
          project._id,
          payload
        );

        toast.success(
          "Project updated successfully."
        );
      } else {
        await createProject(payload);

        toast.success(
          "Project created successfully."
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  const removeSelectedImage =
    async () => {
      try {
        if (
          !imageFile &&
          form.image.publicId
        ) {
          await deleteImage(
            form.image.publicId
          );
        }

        setImageFile(null);
        setPreview("");

        setForm((previous) => ({
          ...previous,
          image: {
            url: "",
            publicId: "",
          },
        }));
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
          "Unable to remove image."
        );
      }
    };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          <motion.button
            type="button"
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur">
              <div>
                <h2 className="font-[Poppins] text-xl font-semibold text-white">
                  {isEditing
                    ? "Edit Project"
                    : "Add Project"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage project details
                  and screenshot.
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
              className="space-y-7 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Project Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={
                    handleChange
                  }
                  placeholder="Task Management System"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description *
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
                  placeholder="Describe your project..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Category
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
                    <option>
                      Web Development
                    </option>

                    <option>
                      Full Stack
                    </option>

                    <option>
                      Frontend
                    </option>

                    <option>
                      Backend
                    </option>

                    <option>
                      Mobile App
                    </option>

                    <option>
                      AI
                    </option>

                    <option>
                      Machine Learning
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    <option>
                      Completed
                    </option>

                    <option>
                      In Progress
                    </option>
                  </select>
                </div>
              </div>

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
                        event.target
                          .value
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
                    className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-blue-500"
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

                {form.technologies
                  .length > 0 && (
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
                            className="text-slate-500 hover:text-red-400"
                          >
                            <FiX />
                          </button>
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="githubUrl"
                    value={
                      form.githubUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Live URL
                  </label>

                  <input
                    type="url"
                    name="liveUrl"
                    value={
                      form.liveUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Project Image
                </label>

                {preview ? (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-800">
                    <img
                      src={preview}
                      alt="Project preview"
                      className="aspect-video w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={
                        removeSelectedImage
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-10 text-center transition hover:border-blue-500/50">
                    <FiImage className="text-3xl text-slate-500" />

                    <p className="mt-3 text-sm font-medium text-slate-300">
                      Choose project
                      screenshot
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PNG, JPEG, WEBP or
                      GIF. Maximum 5MB.
                    </p>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(event) =>
                        setImageFile(
                          event.target
                            .files?.[0] ||
                            null
                        )
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-3">
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

                <span className="text-sm text-slate-300">
                  Feature this project on
                  the portfolio
                </span>
              </label>

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
                      ? "Update Project"
                      : "Create Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectFormModal;