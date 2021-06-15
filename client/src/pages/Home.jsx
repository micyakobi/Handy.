import React, { useState } from 'react';
import { FlexContainer } from '../styles/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/core/styles';
import WorkIcon from '@material-ui/icons/Work';
import { useHistory } from 'react-router-dom';
import LiveHome from '../components/layout/LiveHome';

const useStyles = makeStyles((theme) => ({
  approveButton: {
    marginLeft: '0.5rem',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    borderRadius: '2rem',
    width: '100%',
    margin: '0.5rem',
  }
}));

const Home = () => {

  const classes = useStyles();
  const history = useHistory();

  const handlePoviderClick = () => {
    history.push('/signup');
  }

  const handleClientClick = () => {
    history.push('/signup');
  }

  return (

    <LiveHome>

      <FlexContainer>
        <LiveHome />
        <TitleContainer>
          <h1>WELCOME TO HANDY!!</h1>
          <h4>SERVICE PROVIDERS FOR ALL YOUR NEEDS</h4>
        </TitleContainer>
        <ChoiceDiv>
          <p>Let us know what you're looking for</p>
          <Button
            variant="outlined"
            className={classes.approveButton}
            startIcon={<BuildIcon />}
            onClick={handlePoviderClick}
          >
            I'M A SERVICE PROVIDER. SHOW ME SOME JOBS!
        </Button>
          <Button
            variant="outlined"
            className={classes.approveButton}
            startIcon={<WorkIcon />}
            onClick={handleClientClick}
          >
            I'M LOOKING FOR A HANDYMAN. LET'S POST SOME JOBS!
        </Button>
        </ChoiceDiv>
      </FlexContainer>
    </LiveHome>
  );
}

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

export default Home;