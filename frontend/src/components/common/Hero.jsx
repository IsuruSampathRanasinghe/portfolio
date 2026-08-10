import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowDown,
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

import Container from "./Container";

import {
  usePortfolioSettings,
} from "../../context/SettingsContext";

const Hero = () => {
  const {
    settings,
    loading,
    error,
  } = usePortfolioSettings();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading) {
    return (
      <section
        id="home"
        aria-label="Loading introduction"
        aria-busy="true"
        className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:py-24"
      >
        <Container>
          <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <div
                aria-hidden="true"
                className="h-9 w-44 animate-pulse rounded-full bg-slate-800"
              />

              <div
                aria-hidden="true"
                className="mt-8 h-5 w-28 animate-pulse rounded bg-slate-800"
              />

              <div
                aria-hidden="true"
                className="mt-4 h-14 max-w-xl animate-pulse rounded-2xl bg-slate-800 sm:h-16"
              />

              <div
                aria-hidden="true"
                className="mt-5 h-8 max-w-lg animate-pulse rounded-xl bg-slate-800"
              />

              <div
                aria-hidden="true"
                className="mt-6 h-24 max-w-2xl animate-pulse rounded-xl bg-slate-800"
              />

              <div
                aria-hidden="true"
                className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-9 sm:gap-4"
              >
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-800 min-[420px]:w-36" />

                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-800 min-[420px]:w-36" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="mx-auto aspect-square w-full max-w-[280px] animate-pulse rounded-full bg-slate-800 sm:max-w-xs lg:max-w-sm"
            />
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="home"
        aria-label="Introduction"
        className="flex min-h-screen items-center justify-center bg-slate-950 px-6"
      >
        <p
          role="alert"
          className="text-center text-red-400"
        >
          {error}
        </p>
      </section>
    );
  }

  const name =
    settings?.name ||
    "Portfolio Owner";

  const headline =
    settings?.headline ||
    "Full-Stack Developer";

  const shortBio =
    settings?.shortBio ||
    "I build modern, reliable and user-friendly software applications.";

  const profileImage =
    settings?.profileImage?.url;

  const entranceTransition =
    shouldReduceMotion
      ? {
          duration: 0,
        }
      : {
          duration: 0.7,
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:py-24"
    >
      {/* Decorative backgrounds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl"
      />

      <Container>
        <div className="relative z-10 grid items-center gap-12 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={
              entranceTransition
            }
          >
            {/* Availability */}
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-emerald-400"
              />

              <span className="truncate">
                {settings?.availabilityStatus ||
                  "Open to Opportunities"}
              </span>
            </div>

            <p className="mb-3 text-base font-medium text-blue-400 sm:text-lg">
              Hello, I'm
            </p>

            <h1
              id="hero-title"
              className="font-[Poppins] text-4xl font-extrabold leading-[1.08] tracking-tight text-white min-[400px]:text-5xl sm:text-6xl lg:text-7xl"
            >
              {name}
            </h1>

            <h2 className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-300 sm:text-2xl">
              {headline}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:mt-6 sm:text-lg sm:leading-8">
              {shortBio}
            </p>

            {/* Main actions */}
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-9 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-blue-500 to-violet-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                View Projects

                <FiArrowRight
                  aria-hidden="true"
                />
              </a>

              {settings?.resumeUrl && (
                <a
                  href={
                    settings.resumeUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV (opens in a new tab)"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 font-semibold text-slate-200 backdrop-blur outline-none transition duration-300 hover:-translate-y-0.5 hover:border-blue-500/60 hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <FiDownload
                    aria-hidden="true"
                  />

                  Download CV
                </a>
              )}
            </div>

            {/* Social links */}
            <div
              className="mt-8 flex items-center gap-3 sm:mt-9 sm:gap-4"
              aria-label="Social links"
            >
              {settings?.githubUrl && (
                <a
                  href={
                    settings.githubUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile (opens in a new tab)"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-xl text-slate-400 outline-none transition hover:-translate-y-1 hover:border-slate-600 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <FiGithub
                    aria-hidden="true"
                  />
                </a>
              )}

              {settings?.linkedinUrl && (
                <a
                  href={
                    settings.linkedinUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile (opens in a new tab)"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-xl text-slate-400 outline-none transition hover:-translate-y-1 hover:border-blue-500/50 hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <FiLinkedin
                    aria-hidden="true"
                  />
                </a>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  aria-label={`Send an email to ${settings.email}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-xl text-slate-400 outline-none transition hover:-translate-y-1 hover:border-cyan-500/50 hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <FiMail
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.9,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={
              shouldReduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.8,
                    delay: 0.1,
                  }
            }
            className="relative mx-auto flex w-full max-w-[280px] items-center justify-center sm:max-w-xs lg:max-w-md"
          >
            <div
              aria-hidden="true"
              className="absolute h-[115%] w-[115%] rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20 blur-2xl"
            />

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        -12,
                        0,
                      ],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 5,
                      repeat:
                        Infinity,
                      ease:
                        "easeInOut",
                    }
              }
              className="relative aspect-square w-full max-w-[280px] rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 p-[2px] shadow-2xl shadow-blue-500/20 sm:max-w-xs lg:max-w-sm"
            >
              <div className="h-full w-full rounded-full bg-slate-950 p-4 sm:p-5">
                <div className="h-full w-full overflow-hidden rounded-full bg-slate-900">
                  {profileImage ? (
                    <img
                      src={
                        profileImage
                      }
                      alt={`${name} profile`}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${name} profile placeholder`}
                      className="flex h-full w-full items-center justify-center text-6xl font-semibold text-white sm:text-7xl"
                    >
                      {name
                        .split(" ")
                        .map(
                          (word) =>
                            word[0]
                        )
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
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
        transition={
          shouldReduceMotion
            ? {
                duration: 0,
              }
            : {
                delay: 1.1,
              }
        }
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 rounded-lg text-xs text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:flex"
      >
        <span>
          Scroll Down
        </span>

        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [
                    0,
                    6,
                    0,
                  ],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 1.5,
                  repeat:
                    Infinity,
                }
          }
        >
          <FiArrowDown />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;