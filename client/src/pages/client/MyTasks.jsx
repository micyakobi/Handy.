import React, { useEffect, useState } from "react";
import { FlexContainer, PageContainer, ErrorContainer } from "../../styles/styles";
import MyTaskCard from "../../components/client/MyTaskCard";
import { motion } from "framer-motion";
import styled from "styled-components";
import { StyledLink } from "../../styles/styles";
import { useSelector, useDispatch } from "react-redux";
import { loadMyTasks } from "../../redux/actions/tasksActions";
import { useTheme } from "@material-ui/core";
import { StyledTitle } from "../../styles/styles";

const MyTasks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const theme = useTheme();
  const myTasks = useSelector((state) => state.tasks.myTasks);
  const [noFavDisplay, setNoFavDisplay] = useState(false);
  const [TaskData, setTaskData] = useState([]);

  useEffect(() => {
    if (user._id != undefined) {
      async function doSomething() {
      dispatch(loadMyTasks(user._id));
      }
      doSomething();
    }
    if (myTasks.length < 0) setNoFavDisplay(true);
  }, []);

  useEffect(()=>{
    setTaskData(myTasks);
  },[myTasks]);

  return (
    <PageContainer>
      {TaskData &&
      <FlexContainer>
        {!TaskData.length && (
          <ErrorContainer>
            <StyledTitle color={theme.palette.common.pageTitle}>
              You have no tasks.
          </StyledTitle>
          </ErrorContainer>)}
        {TaskData.length > 0 &&
          TaskData.map((task) => (
              <MyTaskCard task={task} id={task._id} />
          ))}
      </FlexContainer>
      }
    </PageContainer>
  );
};


export default MyTasks;
