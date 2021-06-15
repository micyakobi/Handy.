import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '@material-ui/core';
import ServiceCategory from './ServiceCategory';
import { FlexContainer } from '../../styles/styles';

const ServiceCategoryList = ({ categories, onCategoryClick }) => {

  const theme = useTheme();
  const handleCategoryClick = (category) => {
    onCategoryClick(category);
  }

  return (
    <FlexContainer>
      <ListDiv>
        {categories.map(category => (
          <ServiceCategory category={category} onClick={handleCategoryClick} />
        ))}
      </ListDiv>
    </FlexContainer>
  );
}

const ListDiv = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export default ServiceCategoryList;