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

  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");

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
      aria-labelledby="projects-heading"
      className="relative bg-slate-950 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div id="projects-heading">
          <SectionTitle
            title="Featured Projects"
            subtitle="A selection of applications and software projects I have designed and developed."
          />
        </div>

        {/* Category Filters */}
        {!loading &&
          !error &&
          categories.length > 2 && (
            <div
              className="mb-8 overflow-x-auto pb-2 sm:mb-10 sm:overflow-visible sm:pb-0"
              aria-label="Project category filters"
            >
              <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-3">
                {categories.map(
                  (category) => {
                    const isActive =
                      activeCategory ===
                      category;

                    return (
                      <button
                        key={
                          category
                        }
                        type="button"
                        onClick={() =>
                          setActiveCategory(
                            category
                          )
                        }
                        aria-pressed={
                          isActive
                        }
                        className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                          isActive
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                            : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-blue-500/40 hover:text-white"
                        }`}
                      >
                        {
                          category
                        }
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

        {/* Loading */}
        {loading && (
          <div
            aria-busy="true"
            aria-label="Loading projects"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
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
                  className="h-[390px] animate-pulse rounded-3xl bg-slate-900 sm:h-[430px]"
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
          filteredProjects.length ===
            0 && (
            <p className="py-8 text-center text-slate-500">
              No projects have
              been added yet.
            </p>
          )}

        {/* Projects Grid */}
        {!loading &&
          !error &&
          filteredProjects.length >
            0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredProjects.map(
                (
                  project,
                  index
                ) => (
                  <ProjectCard
                    key={
                      project._id
                    }
                    project={
                      project
                    }
                    index={
                      index
                    }
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