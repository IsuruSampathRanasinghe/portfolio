import {
  FiMapPin,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";

import Container from "./Container";
import SectionTitle from "./SectionTitle";

import GlassCard from "../ui/GlassCard";

import {
  usePortfolioSettings,
} from "../../context/SettingsContext";

const About = () => {
  const {
    settings,
    loading,
  } = usePortfolioSettings();

  if (
    loading ||
    !settings?.about
  ) {
    return null;
  }

  const infoCards = [
    settings.location && {
      icon: FiMapPin,
      label: "Location",
      value: settings.location,
    },

    settings.email && {
      icon: FiMail,
      label: "Email",
      value: settings.email,
    },

    settings.availabilityStatus && {
      icon: FiBriefcase,
      label: "Availability",
      value:
        settings.availabilityStatus,
    },
  ].filter(Boolean);

  return (
    <section
      id="about"
      className="relative py-28"
    >
      <Container>
        <SectionTitle
          title="About Me"
          subtitle="A little about my background, interests and the kind of software I enjoy building."
        />

        <div className="mx-auto max-w-5xl">

          <GlassCard className="p-7 sm:p-10 lg:p-12">

            <p className="whitespace-pre-line text-base leading-8 text-slate-300 sm:text-lg">
              {settings.about}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {infoCards.map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                      <Icon />
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                      {label}
                    </p>

                    <p className="mt-1 break-words font-medium text-slate-200">
                      {value}
                    </p>
                  </div>
                )
              )}

            </div>

          </GlassCard>
        </div>
      </Container>
    </section>
  );
};

export default About;