import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import GlassCard from "../ui/GlassCard";

import { sendContactMessage } from "../../services/contactService";
import { usePortfolioSettings } from "../../context/SettingsContext";

const Contact = () => {
  const { settings } = usePortfolioSettings();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true);

      await sendContactMessage(formData);

      toast.success(
        "Message sent successfully."
      );

      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send your message."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-950/40 py-28"
    >
      <Container>
        <SectionTitle
          title="Contact Me"
          subtitle="Have an opportunity, project idea or question? Feel free to get in touch."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          <GlassCard className="p-7 sm:p-8">
            <h3 className="font-[Poppins] text-2xl font-semibold text-white">
              Let's Connect
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              I'm always open to discussing software projects,
              internships, collaborations and development
              opportunities.
            </p>

            <div className="mt-8 space-y-5">

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                    <FiMail />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Email
                    </p>

                    <p className="truncate text-slate-200">
                      {settings.email}
                    </p>
                  </div>
                </a>
              )}

              {settings?.location && (
                <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xl text-violet-400">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Location
                    </p>

                    <p className="text-slate-200">
                      {settings.location}
                    </p>
                  </div>
                </div>
              )}

            </div>

            <div className="mt-8">
              <p className="text-sm text-slate-500">
                Find me online
              </p>

              <div className="mt-4 flex gap-3">

                {settings?.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 text-xl text-slate-400 transition hover:border-slate-600 hover:text-white"
                  >
                    <FiGithub />
                  </a>
                )}

                {settings?.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 text-xl text-slate-400 transition hover:border-blue-500/50 hover:text-blue-400"
                  >
                    <FiLinkedin />
                  </a>
                )}

              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-7 sm:p-8">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    {...register("name", {
                      required: "Name is required.",
                      minLength: {
                        value: 2,
                        message:
                          "Name must contain at least 2 characters.",
                      },
                    })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Please enter a valid email address.",
                      },
                    })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  {...register("subject", {
                    required: "Subject is required.",
                    minLength: {
                      value: 3,
                      message:
                        "Subject must contain at least 3 characters.",
                    },
                  })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                {errors.subject && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message..."
                  {...register("message", {
                    required: "Message is required.",
                    minLength: {
                      value: 10,
                      message:
                        "Message must contain at least 10 characters.",
                    },
                  })}
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <FiSend />

                {submitting
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>
          </GlassCard>

        </div>
      </Container>
    </section>
  );
};

export default Contact;