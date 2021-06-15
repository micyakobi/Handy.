import React, { useState, useEffect } from 'react';
//Strling and Animation
import { FlexContainer, PageContainer } from '../../styles/styles';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
//Components
import SubmitOfferForm from '../../components/provider/SubmitOfferForm';
import { StyledTitle } from '../../styles/styles';
import { useTheme } from '@material-ui/core';

const SubmitTaskOffer = () => {
  const theme = useTheme();
  const location = useLocation();
  const taskId = decodeURI(location.pathname.split("/")[2]);

  return (
    <PageContainer>
      <FlexContainer>
        <StyledOffer>
          <SubmitOfferForm taskId={taskId} />
        </StyledOffer>
      </FlexContainer>
    </PageContainer>

  );
}

const StyledOffer = styled(motion.div)`
  margin-top: 1rem;
  display:flex;
`;

export default SubmitTaskOffer;
