import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, useTheme } from '@material-ui/core';

const HomeBtn = ({ name, onClick }) => {

  const theme = useTheme();

  return (
    <CategoryDiv
      background={theme.palette.secondary.main}
      color={theme.palette.primary.main}
      onClick={onClick}
    >
      <p>{name}</p>
    </CategoryDiv>
  );
}

const CategoryDiv = styled(motion.div)`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.background};
  color: white;
  border-radius: 1rem;
  opacity: 0.9;
  transition: 0.4s;
  margin: 0.5rem 0;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(0.9);
  }

  p {
    text-align: center;
    font-size: 1rem;
    margin: 1rem;
  }
`;

export default HomeBtn;