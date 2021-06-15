import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;

export const FlexContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTitle = styled.h1`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${props => props.color};
`;

export const StyledDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: ${props => props.color};
`;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5rem 1rem 1rem 1rem;
`;

export const ErrorContainer = styled.div`
  display: flex;
  padding-top: 50%;
`;