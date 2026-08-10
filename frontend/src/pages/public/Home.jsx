import Hero from "../../components/common/Hero";
import About from "../../components/common/About";
import Skills from "../../components/skill/Skills";
import Projects from "../../components/project/Projects";
import Education from "../../components/education/Education";
import Experience from "../../components/experience/Experience";
import Contact from "../../components/contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;