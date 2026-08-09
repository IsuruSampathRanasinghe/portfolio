import {
  useMemo,
  useState,
} from "react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import ProjectCard from "./ProjectCard";

import useProjects from "../../hooks/useProjects";

const Projects = () => {
  const {
    projects,
    loading,
    error,
  } = useProjects({
    limit: 50,
    sort: "latest",
  });

  const [activeCategory, setActiveCategory] =
    useState("All");

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        projects
          .map(
            (project) =>
              project.category
          )
          .filter(Boolean)
      ),
    ];

    return [
      "All",
      ...uniqueCategories,
    ];
  }, [projects]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category ===
            activeCategory
        );

  return (
    <section
      id="projects"
      className="relative py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <Container>
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of applications and software projects I have designed and developed."
        />

        {!loading &&
          !error &&
          categories.length > 2 && (
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {categories.map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      activeCategory ===
                      category
                        ? "bg-blue-500 text-white"
                        : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-blue-500/40 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          )}

        {loading && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-[430px] animate-pulse rounded-3xl bg-slate-900"
                />
              )
            )}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredProjects.length ===
            0 && (
            <p className="text-center text-slate-500">
              No projects have been added yet.
            </p>
          )}

        {!loading &&
          !error &&
          filteredProjects.length >
            0 && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                  />
                )
              )}
            </div>
          )}
      </Container>
    </section>
  );
};

export default Projects;