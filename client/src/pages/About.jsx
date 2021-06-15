import React from "react";
//Page Components
import AboutSection from "../components/about/AboutSection";
import FaqSection from "../components/about/FaqSection";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../components/about/animation";


const About = () => {
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <AboutSection />
      <FaqSection />
    </motion.div>
  );
};

export default About;
