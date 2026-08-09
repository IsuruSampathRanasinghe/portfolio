import {
  useEffect,
  useState,
} from "react";

import {
  FiArrowUp,
} from "react-icons/fi";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

const BackToTop = () => {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(
        window.scrollY > 700
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/90 text-lg text-slate-300 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:border-blue-500/50 hover:text-blue-400"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;