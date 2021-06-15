import React from 'react';
//need to delete
//Styling and Animation
import styled from 'styled-components';
import { motion } from "framer-motion";

const TaskCard = ({ title, categoryTitle, description, url, id }) => {

  return (
    <StyledTasks >
      <h2> {title} </h2>
      <h4> {categoryTitle}</h4>
      <p>{description} </p>
      <img src="https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png" alt={title} />
    </StyledTasks>
  );
}

const StyledTasks = styled(motion.div)`
min-height:30vh;
box-shadow: 0px 5px 30px rgba(0,0,0,0.3);
text-align: center;
border-radius: 1rem;
cursor: pointer;
overflow: hidden;

img{
    width:100%;
    height:50vh;
    object-fit: cover;
}

`;

export default TaskCard;