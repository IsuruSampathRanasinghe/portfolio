import { motion } from "framer-motion";

import {
  getSkillIcon,
} from "../../utils/skillIcons";

const SkillCard = ({
  skill,
  index,
}) => {
  const SkillIcon = getSkillIcon(
    skill.icon
  );

  return (
    <motion.div
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
        duration: 0.45,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -6,
      }}
      className="group rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 shadow-xl shadow-black/5 backdrop-blur transition duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex items-center gap-4">

        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-2xl text-blue-300 transition duration-300 group-hover:scale-110">
          {SkillIcon ? (
            <SkillIcon />
          ) : (
            <span className="text-base font-bold">
              {skill.name
                ?.split(" ")
                .map(
                  (word) =>
                    word[0]
                )
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-[Poppins] text-lg font-semibold text-white transition group-hover:text-blue-300">
            {skill.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {skill.category}
          </p>
        </div>

      </div>

      <div className="mt-7">

        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Proficiency
          </span>

          <span className="text-sm font-semibold text-blue-300">
            {skill.proficiency}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: `${skill.proficiency}%`,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
          />
        </div>

      </div>
    </motion.div>
  );
};

export default SkillCard;