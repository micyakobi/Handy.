import React, { useEffect, useState } from 'react';
import { FlexContainer, StyledLink, PageContainer, ErrorContainer } from '../../styles/styles';
import MyTaskCard from '../../components/client/MyTaskCard';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { StyledTitle } from '../../styles/styles';
import BtnPostTask from '../../components/client/BtnPostTask';
import { useTheme } from '@material-ui/core';
import { loadMyTasks } from "../../redux/actions/tasksActions";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      transform: 'translateZ(0px)',
      flexGrow: 1,
      margin: '0.5rem 0',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

}));
const MyTasks = () => {

  const user = useSelector(state => state.user.user);
  const theme = useTheme();
  const myTasks = useSelector(state => state.tasks.myTasks);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user._id != undefined) {
      dispatch(loadMyTasks(user._id));
    }
  }, []);

  return (
    <PageContainer>
      {myTasks &&
        <FlexContainer>
          {!myTasks.length && (
            <ErrorContainer>
              <StyledTitle color={theme.palette.common.pageTitle}>
                You have no tasks.
               </StyledTitle>
            </ErrorContainer>)}
          {myTasks.length > 0 &&
            myTasks.map((task) => (
              <StyledLink to={`/TaskDetails/${task._id}`}>
                <MyTaskCard key={task._id} task={task} id={task._id} />

              </StyledLink>
            ))}
          <BtnPostTask />
        </FlexContainer>
      }
    </PageContainer>

  );
}

export default MyTasks;
