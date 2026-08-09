import {
  useEffect,
  useState,
} from "react";

import {
  FiCamera,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSave,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

import {
  uploadImage,
  deleteImage,
} from "../../services/uploadService";

import {
  usePortfolioSettings,
} from "../../context/SettingsContext";

const initialForm = {
  name: "",
  headline: "",
  shortBio: "",
  about: "",
  email: "",
  phone: "",
  location: "",

  profileImage: {
    url: "",
    publicId: "",
  },

  resumeUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",

  availabilityStatus:
    "Open to Opportunities",
};

const Settings = () => {
  const [
    form,
    setForm,
  ] = useState(initialForm);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    imageFile,
    setImageFile,
  ] = useState(null);

  const [
    preview,
    setPreview,
  ] = useState("");

  const {
    refetchSettings,
  } = usePortfolioSettings();

  const loadSettings =
    async () => {
      try {
        setLoading(true);

        const settings =
          await getSettings();

        const nextForm = {
          ...initialForm,
          ...(settings || {}),

          profileImage: {
            url:
              settings
                ?.profileImage
                ?.url || "",

            publicId:
              settings
                ?.profileImage
                ?.publicId || "",
          },
        };

        setForm(nextForm);

        setPreview(
          nextForm
            .profileImage.url
        );

        setError("");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Unable to load portfolio settings."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const objectUrl =
      URL.createObjectURL(
        imageFile
      );

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(
        objectUrl
      );
    };
  }, [imageFile]);

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please choose an image file."
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image must be smaller than 5MB."
      );

      return;
    }

    setImageFile(file);
  };

  const handleRemoveImage =
    async () => {
      try {
        if (
          !imageFile &&
          form.profileImage
            .publicId
        ) {
          await deleteImage(
            form.profileImage
              .publicId
          );
        }

        setImageFile(null);
        setPreview("");

        setForm(
          (previous) => ({
            ...previous,

            profileImage: {
              url: "",
              publicId: "",
            },
          })
        );

        toast.success(
          "Profile image removed."
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to remove profile image."
        );
      }
    };

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (!form.name.trim()) {
        toast.error(
          "Name is required."
        );

        return;
      }

      try {
        setSaving(true);

        let profileImage =
          form.profileImage;

        if (imageFile) {
          const uploadResult =
            await uploadImage(
              imageFile
            );

          profileImage = {
            url:
              uploadResult
                .image.url,

            publicId:
              uploadResult
                .image.publicId,
          };
        }

        const payload = {
          ...form,

          name:
            form.name.trim(),

          headline:
            form.headline.trim(),

          shortBio:
            form.shortBio.trim(),

          about:
            form.about.trim(),

          email:
            form.email.trim(),

          phone:
            form.phone.trim(),

          location:
            form.location.trim(),

          resumeUrl:
            form.resumeUrl.trim(),

          githubUrl:
            form.githubUrl.trim(),

          linkedinUrl:
            form.linkedinUrl.trim(),

          portfolioUrl:
            form.portfolioUrl.trim(),

          profileImage,
        };

        const response =
          await updateSettings(
            payload
          );

        setForm({
          ...payload,

          profileImage:
            response.settings
              ?.profileImage ||
            profileImage,
        });

        setPreview(
          response.settings
            ?.profileImage
            ?.url ||
            profileImage.url
        );

        setImageFile(null);

        await refetchSettings();

        toast.success(
          "Portfolio settings updated successfully."
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to update portfolio settings."
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <LoadingSpinner text="Loading settings..." />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={
          loadSettings
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Portfolio Settings"
        description="Manage your personal information, Hero content, profile image, CV and social links."
      />

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-7"
      >
        {/* Profile */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="font-[Poppins] text-lg font-semibold text-white">
            Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Main information displayed
            in your Hero section.
          </p>

          <div className="mt-7 flex flex-col gap-7 lg:flex-row">
            <div className="shrink-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-950">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl text-slate-700">
                    <FiUser />
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400">
                  <FiCamera />

                  Change

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />
                </label>

                {preview && (
                  <button
                    type="button"
                    onClick={
                      handleRemoveImage
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10"
                    aria-label="Remove image"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>

              <p className="mt-3 max-w-44 text-xs leading-5 text-slate-600">
                PNG, JPEG, WEBP or GIF.
                Maximum 5MB.
              </p>
            </div>

            <div className="grid flex-1 gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Name *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Headline
                </label>

                <input
                  name="headline"
                  value={
                    form.headline
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Computer Science Undergraduate | Full-Stack Developer"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Short Bio
                </label>

                <textarea
                  name="shortBio"
                  value={
                    form.shortBio
                  }
                  onChange={
                    handleChange
                  }
                  rows="3"
                  placeholder="Short introduction shown in the Hero section..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="font-[Poppins] text-lg font-semibold text-white">
            About Me
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Main biography displayed in
            your About section.
          </p>

          <textarea
            name="about"
            value={form.about}
            onChange={
              handleChange
            }
            rows="8"
            placeholder="Tell visitors about yourself..."
            className="mt-6 w-full resize-y rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 leading-7 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </section>

        {/* Contact information */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="font-[Poppins] text-lg font-semibold text-white">
            Contact Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <FiMail />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={
                  handleChange
                }
                placeholder="+94..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <FiMapPin />
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
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Availability
              </label>

              <select
                name="availabilityStatus"
                value={
                  form.availabilityStatus
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="Available">
                  Available
                </option>

                <option value="Open to Opportunities">
                  Open to Opportunities
                </option>

                <option value="Not Available">
                  Not Available
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* Social links */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="font-[Poppins] text-lg font-semibold text-white">
            Links
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            CV and professional profile
            links.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <FiGithub />
                GitHub
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
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <FiLinkedin />
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedinUrl"
                value={
                  form.linkedinUrl
                }
                onChange={
                  handleChange
                }
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                CV / Resume URL
              </label>

              <input
                type="url"
                name="resumeUrl"
                value={
                  form.resumeUrl
                }
                onChange={
                  handleChange
                }
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Portfolio URL
              </label>

              <input
                type="url"
                name="portfolioUrl"
                value={
                  form.portfolioUrl
                }
                onChange={
                  handleChange
                }
                placeholder="https://your-domain.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Save */}
        <div className="sticky bottom-5 z-20 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3.5 font-semibold text-white shadow-2xl shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />

            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Settings;