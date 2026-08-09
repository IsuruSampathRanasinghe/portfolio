import { motion } from "framer-motion";

import {
  FiBriefcase,
  FiExternalLink,
  FiMapPin,
} from "react-icons/fi";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Badge from "../ui/Badge";

import useExperience from "../../hooks/useExperience";
import { formatMonthYear } from "../../utils/formatDate";

const Experience = () => {
  const {
    experiences,
    loading,
    error,
  } = useExperience();

  return (
    <section
      id="experience"
      className="relative py-28"
    >
      <Container>
        <SectionTitle
          title="Experience"
          subtitle="Internships, professional experience and practical work."
        />

        {loading && (
          <div className="mx-auto max-w-4xl space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-3xl bg-slate-900"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          experiences.length === 0 && (
            <p className="text-center text-slate-500">
              No experience records added yet.
            </p>
          )}

        {!loading &&
          !error &&
          experiences.length > 0 && (
            <div className="mx-auto max-w-4xl space-y-7">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience._id}
                  initial={{
                    opacity: 0,
                    y: 25,
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
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-3xl border border-slate-800/80 bg-slate-900/55 p-7 shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:border-blue-500/40 hover:shadow-blue-500/10 sm:p-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-xl text-violet-400">
                        <FiBriefcase />
                      </div>

                      <div>
                        <h3 className="font-[Poppins] text-xl font-semibold text-white">
                          {experience.position}
                        </h3>

                        <p className="mt-1 font-medium text-blue-300">
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    <Badge>
                      {experience.employmentType}
                    </Badge>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <span>
                      {formatMonthYear(experience.startDate)}
                      {" — "}
                      {experience.currentlyWorking
                        ? "Present"
                        : formatMonthYear(experience.endDate)}
                    </span>

                    {experience.location && (
                      <span className="flex items-center gap-1.5">
                        <FiMapPin />
                        {experience.location}
                      </span>
                    )}
                  </div>

                  {experience.description && (
                    <p className="mt-5 leading-7 text-slate-400">
                      {experience.description}
                    </p>
                  )}

                  {experience.technologies?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => (
                        <Badge key={technology}>
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {experience.companyUrl && (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                    >
                      Visit company
                      <FiExternalLink />
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          )}
      </Container>
    </section>
  );
};

export default Experience;