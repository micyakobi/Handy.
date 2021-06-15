import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { editMapReview } from '../redux/actions/tasksActions';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import Chip from "@material-ui/core/Chip";

const TimerTime = ({ taskId, mapTime, providerId, time }) => {
  ;
  const dispatch = useDispatch();
  const history = useHistory();
  const now = new Date().getTime();
  const [min, setmin] = useState((time / 60) * 60 * 1000 + Number(mapTime));

  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");


  let interval = useRef();

  const startTimer = () => {

    interval = setInterval(() => {

      const noww = new Date().getTime();

      const distance = min - noww;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        const mapReview = true;
        clearInterval(interval.current);
        dispatch(editMapReview(taskId, mapReview))
      } else {
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <StyledChip
      size="large"
      label={`${timerMinutes} : ${timerSeconds}`}
      color="secondary"

    />
  )
}

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
  width: 100%;
`;
export default TimerTime;