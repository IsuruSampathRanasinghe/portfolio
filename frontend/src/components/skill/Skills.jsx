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
            className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {Array.from({
              length: 6,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  aria-hidden="true"
                  className="h-40 animate-pulse rounded-3xl bg-slate-900 sm:h-44"
                />
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
            <div className="space-y-12 sm:space-y-14">
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
                    >
                      <div className="mb-5 flex items-center gap-4 sm:mb-7 sm:gap-5">
                        <h3
                          id={
                            categoryId
                          }
                          className="shrink-0 font-[Poppins] text-lg font-semibold text-white sm:text-xl"
                        >
                          {
                            category
                          }
                        </h3>

                        <div
                          aria-hidden="true"
                          className="h-px min-w-0 flex-1 bg-gradient-to-r from-slate-700 to-transparent"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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