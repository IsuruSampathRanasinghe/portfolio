import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiDocker,
} from "react-icons/si";

const iconMap = {
  react: SiReact,
  javascript: SiJavascript,
  typescript: SiTypescript,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  tailwind: SiTailwindcss,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
};

export const getSkillIcon = (
  iconName
) => {
  if (!iconName) {
    return null;
  }

  const normalized =
    iconName
      .toLowerCase()
      .replace(/[\s.-]/g, "");

  return (
    iconMap[normalized] ||
    null
  );
};