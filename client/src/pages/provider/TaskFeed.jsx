import React, { useState, useEffect } from "react";
import { FlexContainer, PageContainer, ErrorContainer } from "../../styles/styles";
import styled from "styled-components";
import { motion } from "framer-motion";
import { StyledLink } from "../../styles/styles";
import MyOffersOfferCard from "../../components/provider/MyOffersOfferCard";
import { useSelector, useDispatch } from "react-redux";
import { loadTasksByProviderIdCategories } from "../../redux/actions/usersActions";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import { StyledTitle } from "../../styles/styles";
import { useTheme } from "@material-ui/core";
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';
import ImagePlaceholder from '../../images/noimage-placeholder.jpg';

const useStyles = makeStyles({
  root: {
    margin: '1rem 0',
  },
  media: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    background: '#ffffff',
  },
  divider: {
    marginBottom: '1rem',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

const TaskFeed = () => {
  const theme = useTheme();
  const userID = useSelector((state) => state.user.user._id);
  const classes = useStyles();
  const allTasks = useSelector((state) => state.user.tasksByCategory);
  const [tasksFeed, setTasksFeed] = useState([]);
  const isLoading = useSelector(state => state.appStatus.showLoader);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userID != undefined)
      dispatch(loadTasksByProviderIdCategories(userID));
  }, []);



  const hendleClick = () => { };
  useEffect(() => {
    setTasksFeed(allTasks);
  }, [allTasks]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = ImagePlaceholder;
  }

  return (
    <PageContainer>
      <FlexContainer>
        {tasksFeed && tasksFeed.length > 0 && !isLoading && (
          <StyledTasks>
            {tasksFeed &&
              tasksFeed.map((task) => (
                <StyledLink key={task._id} to={`/submitoffer/${task._id}`}>
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
                        <Typography gutterBottom variant="h5" component="h2">
                          {task.taskTitle}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {task.taskDesiredPrice
                            ? task.taskDesiredPrice + "$"
                            : task.taskDesiredPrice}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {task.taskDescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    {task.categories != undefined && (
                      <>
                        <Divider light className={classes.divider} />
                        <Container
                          component="div"
                          className={classes.chipContainer}
                        >
                          {task.categories.map((category) => (
                            <StyledChip
                              variant="default"
                              size="small"
                              color="secondary"
                              label={category.categoryTitle}
                            />
                          ))}
                        </Container>
                      </>
                    )}
                    <CardActions>
                      {/* <StyledButton>
                  Post Offer
                 </StyledButton> */}
                    </CardActions>
                  </Card>
                </StyledLink>
              ))}
            {!tasksFeed && !isLoading && (
              <ErrorContainer>
                <StyledTitle color={theme.palette.common.pageTitle}>{"We couldn't find any task for you."}</StyledTitle>
              </ErrorContainer>
            )}
          </StyledTasks>)}
      </FlexContainer>
    </PageContainer>

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

const StyledChip = styled(Chip)`
  margin: 0.3rem;
`;

const StyledTasks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default TaskFeed;
