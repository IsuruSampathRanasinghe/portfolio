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
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
        delay:
          index * 0.05,
      }}
      className="group/skill"
    >
      {/* Skill information */}
      <div className="flex items-center gap-3">

        {/* Skill icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-xl text-blue-300 ring-1 ring-slate-800/80 transition duration-300 group-hover/skill:scale-105 group-hover/skill:ring-blue-500/40">
          {SkillIcon ? (
            <SkillIcon />
          ) : (
            <span className="text-xs font-bold">
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

        {/* Skill name */}
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-[Poppins] text-sm font-medium text-slate-200 transition duration-300 group-hover/skill:text-blue-300 sm:text-[15px]">
            {
              skill.name
            }
          </h4>
        </div>

        {/* Percentage */}
        <span className="shrink-0 text-xs font-semibold text-blue-300 sm:text-sm">
          {
            skill.proficiency
          }
          %
        </span>

      </div>

      {/* Progress */}
      <div className="mt-3 pl-[52px]">

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/90">
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
              duration: 0.9,
              ease: "easeOut",
              delay:
                index * 0.04,
            }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
          />
        </div>

      </div>
    </motion.div>
  );
};

export default SkillCard;