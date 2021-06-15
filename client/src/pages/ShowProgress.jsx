import React, { useEffect } from 'react';
//Strling and Animation
import { FlexContainer } from '../styles/styles';
import { motion } from "framer-motion";
import styled from 'styled-components';
import GoogleMaps from '../components/GoogleMaps';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadTaskDetails } from '../redux/actions/tasksActions';

const ShowProgress = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const taskId = decodeURI(location.pathname.split('/')[2]);
  const taskDetails = useSelector(state => state.tasks.taskDetails.data);


  useEffect(() => {
    if (taskId != undefined)
      dispatch(loadTaskDetails(taskId));
  }, []);


  return (
    <FlexContainer>
      {taskDetails && (
        <StayledTaskProgress>
          {taskDetails.client && taskDetails.winningOffer && (
            <GoogleMaps taskId={taskId} taskDetails={taskDetails} clientDetails={taskDetails.client} providerId={taskDetails.winningOffer.provider._id} />
          )}
        </StayledTaskProgress>
      )}
    </FlexContainer>
  )
}

const StayledTaskProgress = styled(motion.div)`
  padding:2rem 5rem;
  
  h1{
    font-size:3rem;
    font-family:'Abril Fatface', cursive;
    font-weight:lighter;
    padding: 1rem 1rem;
    text-align: center;
  }
`;

const StyledT = styled(motion.div)`
  min-height:80vh;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default ShowProgress;