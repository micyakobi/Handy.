import React from "react";
import styled from "styled-components";

import Toggle from "./Toggle";
import { AnimateSharedLayout } from "framer-motion";
import { useScroll } from "./useScroll";
import { scrollReveal } from "./animation";
import { motion } from "framer-motion";

const FaqSection = () => {
  const [element, controls] = useScroll();
  return (
    <Faq
      variants={scrollReveal}
      ref={element}
      animate={controls}
      initial="hidden"
    >
      <h3>
        Got questions?
      </h3>
      <AnimateSharedLayout>
        <Toggle title="How Do I Start?">
          <div className="answer">
            <p>
              That's easy. Just upload a task in the post task page! You'll get tons of offers from handies nearby, the only thing that remains is to choose.
            </p>
          </div>
        </Toggle>
        <Toggle title="How can i offer services?">
          <div className="answer">
            <p>
              If you're a provider make sure you sign up as one. Then just browse the task feed for relevant offers and bid to win your clients!
            </p>
          </div>
        </Toggle>
        <Toggle title="Can i track the task?">
          <div className="answer">
            <p>
              Of course! when approving an offer, both sides can track the location and time remaining for delivery.
            </p>
          </div>
        </Toggle>
        <Toggle title="How i choose a provider?">
          <div className="answer">
            <p>
              Handy works with a rating algorithm to make sure you get the best offers from top rated providers. You can also read others' reviews and leave reviews of your own!
            </p>
          </div>
        </Toggle>
      </AnimateSharedLayout>
    </Faq>
  );
};

const About = styled(motion.div)`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5rem 10rem;
  color: #00aeff;
  @media (max-width: 1300px) {
    display: block;
    padding: 2rem 2rem;
    text-align: center;
  }
`;

const Faq = styled(About)`
  display: block;
  span {
    display: block;
  }
  h3 {
    padding-bottom: 2rem;
    font-weight: lighter;
  }
  .faq-line {
    background: #cccccc;
    height: 0.2rem;
    margin: 1rem 0rem;
    width: 100%;
  }
  .question {
    padding: 2rem 0rem;
    cursor: pointer;
  }
  .answer {
    padding: 2rem 0rem;
    p {
      padding: 1rem 0rem;
    }
  }
`;

export default FaqSection;
