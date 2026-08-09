import { motion } from "framer-motion";
import { FiBookOpen, FiMapPin } from "react-icons/fi";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import useEducation from "../../hooks/useEducation";
import { formatMonthYear } from "../../utils/formatDate";

const Education = () => {
  const {
    education,
    loading,
    error,
  } = useEducation();

  return (
    <section
      id="education"
      className="relative bg-slate-950/40 py-28"
    >
      <Container>
        <SectionTitle
          title="Education"
          subtitle="My academic background and ongoing studies."
        />

        {loading && (
          <div className="mx-auto max-w-4xl space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-3xl bg-slate-900"
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
          education.length === 0 && (
            <p className="text-center text-slate-500">
              No education records added yet.
            </p>
          )}

        {!loading &&
          !error &&
          education.length > 0 && (
            <div className="relative mx-auto max-w-4xl">

              <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-blue-500 via-slate-700 to-transparent md:left-1/2" />

              <div className="space-y-10">
                {education.map((item, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <motion.div
                      key={item._id}
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
                      className={`relative md:w-1/2 ${
                        isLeft
                          ? "md:pr-10"
                          : "md:ml-auto md:pl-10"
                      }`}
                    >
                      <div className="absolute left-2.5 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-4 border-slate-950 bg-blue-500 md:left-auto md:right-[-10px]">
                        {!isLeft && (
                          <span className="hidden" />
                        )}
                      </div>

                      {!isLeft && (
                        <div className="absolute left-[-10px] top-8 z-10 hidden h-5 w-5 rounded-full border-4 border-slate-950 bg-violet-500 md:block" />
                      )}

                      <div className="ml-12 rounded-3xl border border-slate-800/80 bg-slate-900/55 p-7 shadow-xl shadow-black/10 backdrop-blur md:ml-0">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-xl text-blue-400">
                            <FiBookOpen />
                          </div>

                          <div>
                            <h3 className="font-[Poppins] text-xl font-semibold text-white">
                              {item.degree}
                            </h3>

                            {item.fieldOfStudy && (
                              <p className="mt-1 text-blue-300">
                                {item.fieldOfStudy}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="mt-5 font-medium text-slate-200">
                          {item.institution}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          {formatMonthYear(item.startDate)}
                          {" — "}
                          {item.currentlyStudying
                            ? "Present"
                            : formatMonthYear(item.endDate)}
                        </p>

                        {item.location && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                            <FiMapPin />
                            {item.location}
                          </div>
                        )}

                        {item.description && (
                          <p className="mt-5 leading-7 text-slate-400">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
      </Container>
    </section>
  );
};

export default Education;