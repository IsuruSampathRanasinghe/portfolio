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

  const groupedSkills = skills.reduce(
    (groups, skill) => {
      const category =
        skill.category || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(skill);

      return groups;
    },
    {}
  );

  return (
    <section
      id="skills"
      className="relative bg-slate-950/40 py-28"
    >
      <Container>
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I use to build modern software applications."
        />

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-2xl bg-slate-900"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          skills.length === 0 && (
            <p className="text-center text-slate-500">
              No skills have been added yet.
            </p>
          )}

        {!loading &&
          !error &&
          skills.length > 0 && (
            <div className="space-y-14">
              {Object.entries(
                groupedSkills
              ).map(
                ([
                  category,
                  categorySkills,
                ]) => (
                  <div key={category}>
                    <div className="mb-7 flex items-center gap-5">
                      <h3 className="font-[Poppins] text-xl font-semibold text-white">
                        {category}
                      </h3>

                      <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {categorySkills.map(
                        (
                          skill,
                          index
                        ) => (
                          <SkillCard
                            key={skill._id}
                            skill={skill}
                            index={index}
                          />
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
      </Container>
    </section>
  );
};

export default Skills;