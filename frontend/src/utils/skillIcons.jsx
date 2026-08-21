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
  SiPostman,
  SiNpm,
  SiPhp,
  SiPython,
  SiMongoose,
  SiPrisma,
  SiCloudinary,
  SiVercel,
  SiSocketdotio,
  SiAxios,
  SiDevelopmentcontainers,
  SiThemoviedatabase
} from "react-icons/si";

import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { DiResponsive } from "react-icons/di";

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
  java: FaJava,
  postman: SiPostman,
  vscode: VscVscode,
  npm: SiNpm,
  php: SiPhp,
  python: SiPython,
  mongoose: SiMongoose,
  prisma: SiPrisma,
  cloudinary: SiCloudinary,
  vercel: SiVercel,
  socketio: SiSocketdotio,
  axios: SiAxios,
  fullstackdevelopment: SiDevelopmentcontainers,
  responsivedesign: DiResponsive,
  datavisualization: SiThemoviedatabase
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