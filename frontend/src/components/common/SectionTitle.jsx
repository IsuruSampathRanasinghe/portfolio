import { motion } from "framer-motion";

const SectionTitle = ({
  title,
  subtitle,
  align = "center",
}) => {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

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
        duration: 0.5,
      }}
      className={`mb-14 flex flex-col ${alignment}`}
    >
      <span className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
        Portfolio
      </span>

      <h2 className="font-[Poppins] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          {subtitle}
        </p>
      )}

      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />
    </motion.div>
  );
};

export default SectionTitle;