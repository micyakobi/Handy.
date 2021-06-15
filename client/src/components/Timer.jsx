import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import styled from 'styled-components';
import { findDistanceURL } from '../api/users';
import { sendGetRequestById } from '../utils/utils';
import TimerTime from './TimerTime';
import { useHistory } from 'react-router';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import { LOCAL_HOST_SERVER_URL } from '../api/utils';
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    margin: '1rem',
    width: 250,
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0",
    paddingBottom: "1rem",
  },
  timeDisplay: {
    width: '100%',
  },
  content: {
    padding: 0,
  },
  content: {
    padding: '1rem',
  }
});

const Timer = ({ taskId, mapTime, providerId, price, sourceLat, sourceLong, destLat, destLong, isReviewAvailable }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [Distance, setDistance] = useState([]);
  useEffect(() => {
    dispatch(sendGetRequestById(findDistanceURL(sourceLat, sourceLong, destLat, destLong), setDistance));
  }, [])

  const handleReviewClick = () => {
    history.push(`/addreview/${taskId}`)
  }

  return (
    <Card className={classes.root}>
      {Distance && Distance.durations && Distance.distances && (
        <CardContent className={classes.content}>
          <StyledTimmerBox>
            <TimerTime taskId={taskId} mapTime={mapTime} providerId={providerId} time={Distance.durations[0].duration} />
          </StyledTimmerBox>
          <ChipArea>
            <StyledChip
              variant="outlined"
              icon={<LocationOnIcon />}
              size="small"
              label={`${Distance.distances[0].distance} km`}
              color="secondary"
            />
            <StyledChip
              variant="outlined"
              icon={<MonetizationOnIcon />}
              size="small"
              label={`${price}$`}
              color="secondary"
            />
          </ChipArea>
        </CardContent>
      )}
      {isReviewAvailable && (
        <CardActions className={classes.cardActions}>
          <Button onClick={handleReviewClick} size="small" color="secondary" variant="contained">
            {"Leave A Review"}
          </Button>
        </CardActions>
      )}

    </Card>
  )
}

const StyledTimmerBox = styled.div`
  display:flex;
  align-items: center;
  justify-content:center;
`;

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
  width: 100%;
`;

const ChipArea = styled(motion.div)`
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
`;

export default Timer;