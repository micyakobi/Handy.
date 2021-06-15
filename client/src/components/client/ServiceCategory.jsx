import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, useTheme } from '@material-ui/core';

const ServiceCategory = ({ category, onClick }) => {

  const theme = useTheme();
  const handleCategoryClick = () => {
    onClick(category);
  }
  return (
    <CategoryDiv
      background={theme.palette.secondary.main}
      color={theme.palette.primary.main}
      onClick={handleCategoryClick}
    >
      <p>{category.categoryTitle}</p>
    </CategoryDiv>
  );
}

const CategoryDiv = styled(motion.div)`
  height: 50px;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.background};
  color: white;
  border-radius: 1rem;
  opacity: 0.9;
  transition: 0.3s;
  padding: 1rem;
  margin: 0.3rem;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(0.9);
  }

  p {
    text-align: center;
    font-size: 0.8rem;
    margin: 1.5rem;
  }
`;

export default ServiceCategory;