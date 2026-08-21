import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import SkillCard from "./SkillCard";

import useSkills from "../../hooks/useSkills";

const Skills = () => {
  const {
    skills,
    loading,
    error,
  } = useSkills();

  const groupedSkills =
    skills.reduce(
      (groups, skill) => {
        const category =
          skill.category ||
          "Other";

        if (
          !groups[
            category
          ]
        ) {
          groups[
            category
          ] = [];
        }

        groups[
          category
        ].push(skill);

        return groups;
      },
      {}
    );

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative bg-slate-950/60 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div id="skills-heading">
          <SectionTitle
            title="Technical Skills"
            subtitle="Technologies and tools I use to design, build and maintain modern software applications."
          />
        </div>

        {/* Loading */}
        {loading && (
          <div
            aria-busy="true"
            aria-label="Loading skills"
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {Array.from({
              length: 3,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-5"
                >
                  {/* Header skeleton */}
                  <div className="mb-6">
                    <div className="mb-2 h-5 w-36 animate-pulse rounded bg-slate-800" />

                    <div className="h-3 w-24 animate-pulse rounded bg-slate-800/70" />
                  </div>

                  {/* Skill row skeletons */}
                  <div className="space-y-5">
                    {Array.from({
                      length: 4,
                    }).map(
                      (
                        _,
                        skillIndex
                      ) => (
                        <div
                          key={skillIndex}
                          className="animate-pulse"
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-slate-800" />

                            <div className="h-4 w-28 rounded bg-slate-800" />

                            <div className="ml-auto h-4 w-10 rounded bg-slate-800" />
                          </div>

                          <div className="h-1.5 rounded-full bg-slate-800" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Error */}
        {!loading &&
          error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-center text-sm text-red-400 sm:p-6 sm:text-base"
            >
              {error}
            </div>
          )}

        {/* Empty */}
        {!loading &&
          !error &&
          skills.length ===
            0 && (
            <p className="py-8 text-center text-slate-500">
              No skills have
              been added yet.
            </p>
          )}

        {/* Skills */}
        {!loading &&
          !error &&
          skills.length >
            0 && (
            <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Object.entries(
                groupedSkills
              ).map(
                ([
                  category,
                  categorySkills,
                ]) => {
                  const categoryId =
                    `skills-${category
                      .toLowerCase()
                      .replace(
                        /[^a-z0-9]+/g,
                        "-"
                      )}`;

                  return (
                    <section
                      key={
                        category
                      }
                      aria-labelledby={
                        categoryId
                      }
                      className="group/category rounded-3xl border border-slate-800/80 bg-slate-900/35 p-5 shadow-xl shadow-black/5 backdrop-blur transition duration-300 hover:border-blue-500/30 hover:bg-slate-900/45 sm:p-6"
                    >
                      {/* Category Header */}
                      <div className="mb-6">

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">

                            {/* Category icon decoration */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20">
                              <div className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                            </div>

                            <div className="min-w-0">
                              <h3
                                id={
                                  categoryId
                                }
                                className="truncate font-[Poppins] text-base font-semibold text-white sm:text-lg"
                              >
                                {
                                  category
                                }
                              </h3>

                              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                {
                                  categorySkills.length
                                }{" "}
                                {categorySkills.length ===
                                1
                                  ? "technology"
                                  : "technologies"}
                              </p>
                            </div>

                          </div>

                          {/* Count badge */}
                          <span className="shrink-0 rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs font-medium text-slate-400">
                            {
                              categorySkills.length
                            }
                          </span>
                        </div>

                        {/* Category divider */}
                        <div
                          aria-hidden="true"
                          className="mt-5 h-px bg-gradient-to-r from-blue-500/30 via-slate-700/70 to-transparent"
                        />

                      </div>

                      {/* Skill Rows */}
                      <div className="space-y-5">
                        {categorySkills.map(
                          (
                            skill,
                            index
                          ) => (
                            <SkillCard
                              key={
                                skill._id
                              }
                              skill={
                                skill
                              }
                              index={
                                index
                              }
                            />
                          )
                        )}
                      </div>

                    </section>
                  );
                }
              )}
            </div>
          )}
      </Container>
    </section>
  );
};

export default Skills;