import React from 'react';
import { FlexContainer, PageContainer } from '../../styles/styles';
import PostTaskForm from '../../components/client/PostTaskForm';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PostTask = () => {

  return (
    <FlexContainer>
      <TaskContainer>
        <PostTaskForm />
      </TaskContainer>
    </FlexContainer>
  );
}

const TaskContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PostTask;