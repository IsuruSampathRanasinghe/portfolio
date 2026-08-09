import { motion } from "framer-motion";

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

  if (loading) {
    return (
      <section
        id="home"
        className="flex min-h-screen items-center bg-transparent pt-24"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="animate-pulse">
              <div className="h-5 w-28 rounded bg-slate-800" />
              <div className="mt-5 h-16 max-w-xl rounded bg-slate-800" />
              <div className="mt-5 h-10 max-w-2xl rounded bg-slate-800" />
              <div className="mt-5 h-24 max-w-2xl rounded bg-slate-800" />
            </div>
          </div>
        </Container>

        <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                delay: 1.1,
            }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-slate-500 md:flex"
            >
            <span>
                Scroll Down
            </span>

            <motion.div
                animate={{
                y: [0, 6, 0],
                }}
                transition={{
                duration: 1.5,
                repeat: Infinity,
                }}
            >
                <FiArrowDown className="text-lg" />
            </motion.div>
        </motion.a>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center">
        <Container>
          <p className="text-red-400">
            {error}
          </p>
        </Container>
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

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >

      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl" />

      <Container>
        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              {settings?.availabilityStatus ||
                "Open to Opportunities"}
            </div>

            <p className="mb-3 text-lg font-medium text-blue-400">
              Hello, I'm
            </p>

            <h1 className="font-[Poppins] text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {name}
            </h1>

            <h2 className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-slate-300 sm:text-2xl">
              {headline}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {shortBio}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-blue-500 to-violet-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30"
              >
                View Projects

                <FiArrowRight />
              </a>

              {settings?.resumeUrl && (
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 font-semibold text-slate-200 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-500/60 hover:text-blue-300"
                >
                  <FiDownload />

                  Download CV
                </a>
              )}
            </div>

            <div className="mt-9 flex items-center gap-4">

              {settings?.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-xl text-slate-400 transition hover:-translate-y-1 hover:border-slate-600 hover:text-white"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-xl text-slate-400 transition hover:-translate-y-1 hover:border-blue-500/50 hover:text-blue-400"
                >
                  <FiLinkedin />
                </a>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-xl text-slate-400 transition hover:-translate-y-1 hover:border-cyan-500/50 hover:text-cyan-400"
                >
                  <FiMail />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="relative mx-auto flex w-full max-w-md items-center justify-center"
          >
            <div className="absolute h-[115%] w-[115%] rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20 blur-2xl" />

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative aspect-square w-full max-w-sm rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 p-[2px] shadow-2xl shadow-blue-500/20"
            >
              <div className="h-full w-full rounded-full bg-slate-950 p-5">

                <div className="h-full w-full overflow-hidden rounded-full bg-slate-900">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-7xl font-semibold text-white">
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
    </section>
  );
};

export default Hero;