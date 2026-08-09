import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";

import { usePortfolioSettings } from "../../context/SettingsContext";

const Footer = () => {
  const { settings } = usePortfolioSettings();

  const name = settings?.name || "Portfolio";

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <a
              href="#home"
              className="font-[Poppins] text-2xl font-bold text-white"
            >
              Isuru
              <span className="text-blue-500">.</span>
            </a>

            <p className="mt-3 max-w-md leading-7 text-slate-400">
              {settings?.headline ||
                "Full-Stack Developer"}
            </p>

            {settings?.availabilityStatus && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-sm text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                {settings.availabilityStatus}
              </div>
            )}
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Connect
            </p>

            <div className="flex gap-3">
              {settings?.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-xl text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:text-white"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-xl text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:text-blue-400"
                >
                  <FiLinkedin />
                </a>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-xl text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:text-cyan-400"
                >
                  <FiMail />
                </a>
              )}
            </div>

            {settings?.portfolioUrl && (
              <a
                href={settings.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-400"
              >
                Portfolio URL
                <FiArrowUpRight />
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-800/80 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <p>
            Built with React, Tailwind CSS & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;