import React from 'react';
import { FlexContainer, PageContainer } from '../styles/styles';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { StyledTitle } from '../styles/styles';
import { useTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import HomeBtn from '../components/ui-components/HomeBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const HomeLogIn = () => {
  const classes = useStyles();
  const cureectUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const history = useHistory();
  const theme = useTheme();

  const handelPostAtask = () => {
    history.push("/posttask");
  }
  const handelTasks = () => {
    history.push("/mytasks");
  }
  const handelOffers = () => {
    history.push("/myoffers");
  }
  const handelTaskfeed = () => {
    history.push("/taskfeed");
  }


  return (
    <PageContainer>
      <FlexContainer>
        <StyledTitle color={theme.palette.common.pageTitle}>{` `}</StyledTitle>
        {cureectUser.isClient && cureectUser.isProvider ? (
          <ListDiv>
            <HomeBtn name={"Post A Task"} onClick={handelPostAtask} />
            <HomeBtn name={"My Tasks"} onClick={handelTasks} />
            <HomeBtn name={"My Offers"} onClick={handelOffers} />
            <HomeBtn name={"Task Feed"} onClick={handelTaskfeed} />
          </ListDiv>
        ) : (
          <FlexContainer>

            {cureectUser.isClient ? (
              history.push('/mytaskshome')
            ) :
              (
                history.push('/taskfeed')
              )
            }
          </FlexContainer>
        )}
      </FlexContainer>
    </PageContainer>

  );
}

const ListDiv = styled(motion.div)`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h4 {
    margin-top: 0.5rem;
  }
`;

const ChoiceDiv = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 3rem;

    p {
      margin-bottom: 1rem;
    }
  `;

export default HomeLogIn;