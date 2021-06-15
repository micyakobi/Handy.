import React from "react";
import { motion } from "framer-motion";
import { titleAnim, fade, photoAnim } from "./animation";
import Wave from "./Wave";
import styled from "styled-components";
import { PageContainer } from '../../styles/styles';

const AboutSection = () => {
  return (
    <About>
      <Description>
        <motion.div>
          <Hide>
            <br></br>
            <motion.h3 variants={titleAnim}>All your needs</motion.h3>
          </Hide>
          <Hide>
            <motion.h3 variants={titleAnim}>
              in one place.
            </motion.h3>
          </Hide>
        </motion.div>
        <br></br>
        <motion.p variants={fade}>
          Welcome to handy! The search is over. <br />
          Every need has an answer nearby.<br /><br />
          Just let us know what your looking for and an experienced handyman will visit you in no time!
        </motion.p>
      </Description>
      <Wave />
    </About>
  );
};

//Styled Components
const About = styled(motion.div)`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 5rem 2rem;
  color: #00aeff;
  @media (max-width: 1300px) {
    display: block;
    margin-top: 1rem;
    text-align: center;
  }
`;
const Description = styled.div`
  flex: 1;
  padding-right: 5rem;
  z-index: 2;
  h1 {
    font-weight: lighter;
  }
  @media (max-width: 1300px) {
    padding: 0;
    button {
      margin: 2rem 0rem 5rem 0rem;
    }
  }
`;

const Hide = styled.div`
  overflow: hidden;
`;


export default AboutSection;




