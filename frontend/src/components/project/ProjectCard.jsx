import { useState } from "react";

import { motion } from "framer-motion";

import {
  FiExternalLink,
  FiGithub,
} from "react-icons/fi";

import Badge from "../ui/Badge";

const ProjectCard = ({
  project,
  index,
}) => {
  const [
    imageError,
    setImageError,
  ] = useState(false);

  const image =
    project.image?.url &&
    !imageError
      ? project.image.url
      : null;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -6,
      }}
      className="group overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/55 shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        {image ? (
          <img
            src={image}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            onError={() =>
              setImageError(true)
            }
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-600">
            Project Preview
          </div>
        )}

        {/* Project Status */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.featured && (
            <Badge className="border-blue-400/30 bg-blue-500/15 text-blue-300">
              Featured
            </Badge>
          )}

          <Badge>
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <p className="text-sm font-medium text-blue-400">
          {project.category}
        </p>

        <h3 className="mt-2 font-[Poppins] text-xl font-semibold text-white transition group-hover:text-blue-300">
          {project.title}
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-slate-400">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies
          ?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map(
              (technology) => (
                <Badge
                  key={
                    technology
                  }
                >
                  {
                    technology
                  }
                </Badge>
              )
            )}
          </div>
        )}

        {/* Links */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={
                project.githubUrl
              }
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              <FiGithub />

              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={
                project.liveUrl
              }
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live demo`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <FiExternalLink />

              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;