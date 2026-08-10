import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] =
    useState(false);

  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const [
    activeSection,
    setActiveSection,
  ] = useState("home");

  const menuButtonRef =
    useRef(null);

  const links = [
    {
      name: "Home",
      href: "#home",
      id: "home",
    },
    {
      name: "About",
      href: "#about",
      id: "about",
    },
    {
      name: "Skills",
      href: "#skills",
      id: "skills",
    },
    {
      name: "Projects",
      href: "#projects",
      id: "projects",
    },
    {
      name: "Education",
      href: "#education",
      id: "education",
    },
    {
      name: "Experience",
      href: "#experience",
      id: "experience",
    },
    {
      name: "Contact",
      href: "#contact",
      id: "contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) =>
        document.getElementById(
          link.id
        )
      )
      .filter(Boolean);

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setActiveSection(
                  entry.target.id
                );
              }
            }
          );
        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0,
        }
      );

    sections.forEach(
      (section) =>
        observer.observe(section)
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (
      event
    ) => {
      if (
        event.key ===
          "Escape" &&
        open
      ) {
        setOpen(false);

        menuButtonRef.current
          ?.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >= 768
      ) {
        setOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-800/80 bg-slate-950/95 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#home"
          aria-label="Go to homepage"
          className="rounded-md font-[Poppins] text-xl font-bold tracking-tight text-white outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Isuru

          <span
            aria-hidden="true"
            className="text-blue-500"
          >
            .
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(
            (link) => {
              const isActive =
                activeSection ===
                link.id;

              return (
                <a
                  key={
                    link.name
                  }
                  href={
                    link.href
                  }
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                    isActive
                      ? "text-blue-400"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  {
                    link.name
                  }

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-500"
                    />
                  )}
                </a>
              );
            }
          )}
        </div>

        {/* Mobile menu button */}
        <button
          ref={
            menuButtonRef
          }
          type="button"
          onClick={() =>
            setOpen(
              (value) =>
                !value
            )
          }
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={
            open
          }
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl text-white outline-none transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
        >
          {open ? (
            <FiX
              aria-hidden="true"
            />
          ) : (
            <FiMenu
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-slate-800 bg-slate-950/98 px-4 pb-6 pt-4 backdrop-blur-xl sm:px-6 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map(
              (link) => {
                const isActive =
                  activeSection ===
                  link.id;

                return (
                  <a
                    key={
                      link.name
                    }
                    href={
                      link.href
                    }
                    onClick={
                      handleLinkClick
                    }
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    className={`rounded-xl px-4 py-3.5 text-base font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                      isActive
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {
                      link.name
                    }
                  </a>
                );
              }
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;