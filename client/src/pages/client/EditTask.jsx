import React, { useEffect } from 'react';
import { FlexContainer, PageContainer } from '../../styles/styles';
import EditTaskC from '../../components/client/EditTaskC';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { loadTaskDetails } from '../../redux/actions/tasksActions';
import { useDispatch, useSelector } from 'react-redux';

const EditTask = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const taskId = decodeURI(location.pathname.split("/")[2]);
  const taskDetails = useSelector(state => state.tasks.taskDetails);

  useEffect(() => {
    if (taskId != undefined) {
      dispatch(loadTaskDetails(taskId));
    }
  }, [taskId]);

  return (
    <FlexContainer>
      {taskDetails &&
        <TaskContainer>
          {taskDetails.data &&
            <EditTaskC task={taskDetails.data} />
          }
        </TaskContainer>
      }
    </FlexContainer>
  );
}

const TaskContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default EditTask;