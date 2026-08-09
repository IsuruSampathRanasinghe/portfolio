import {
  useEffect,
  useState,
} from "react";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState("home");

  const links = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) =>
        document.getElementById(link.id)
      )
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => {
      sections.forEach((section) =>
        observer.unobserve(section)
      );
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/85 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">

        <a
          href="#home"
          className="font-[Poppins] text-xl font-bold tracking-tight text-white"
        >
          Isuru
          <span className="text-blue-500">
            .
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive =
              activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-blue-400"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-500" />
                )}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            setOpen((value) => !value)
          }
          aria-label="Toggle navigation"
          className="rounded-lg p-2 text-2xl text-white transition hover:bg-slate-800 md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive =
                activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={`rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;