import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";
import { motion } from "framer-motion";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';
import ImagePlaceholder from '../../images/noimage-placeholder.jpg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {loadTaskDetails} from '../../redux/actions/tasksActions';

const useStyles = makeStyles({
  root: {
    margin: '1rem 0',
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
});

const MyTaskCard = ({ task, id }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = ImagePlaceholder;
  }

  const handelEditTask = () => {
    
    dispatch(loadTaskDetails(id));
    setTimeout(() => {
      history.push(`/editTask/${id}`)
    }, 3000);
  }

  const handelDetailsTask = () => {
    history.push(`/TaskDetails/${id}`)
  }

  return (
    <StyledOffers>
      {task &&
        <Card className={classes.root}>
          <CardActionArea>
            <ImageContainer>
              <CardMedia
                className={classes.media}
                component="img"
                onError={handleImageError}
                image={task.taskImage ? `${LOCAL_HOST_SERVER_URL}${task.taskImage}` : ''}
              />
            </ImageContainer>
            <CardContent>
              <CardTitleArea>
                <Typography variant="h5" component="h2">
                  {task.taskTitle}
                </Typography>
              </CardTitleArea>
              <Typography variant="body2" color="textSecondary" component="p">
                {task.taskDescription}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {task.taskDesiredPrice}$
            </Typography>
            </CardContent>
          </CardActionArea>
          <ChipArea>
            <StyledChip
              variant="default"
              size="small"
              label={task.isActive ? "Active" : "Not Active"}
              color={task.isActive ? "secondary" : ""}
            />
            <StyledChip
              variant="outlined"
              size="small"
              label={`Offers: ${task.offersCount}`}
            />
            <StyledChip
              variant="outlined"
              size="small"
              label={task.bestBID ? `Best Bid: ${task.bestBID.priceByid}$` : "No Bids Yet"}
            />
          </ChipArea>
          <Divider light />
          <CardActions className={classes.cardActions}>
            <Button size="small" color="secondary" variant="contained" onClick={handelDetailsTask} >
              {"Details & Offers"}
            </Button>
            <Button size="small" color="secondary" variant="contained" onClick={handelEditTask}>
              {"Edit"}
            </Button>
          </CardActions>
        </Card>
      }
    </StyledOffers>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledOffers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardTitleArea = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
`;

const ChipArea = styled(motion.div)`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

export default MyTaskCard;
