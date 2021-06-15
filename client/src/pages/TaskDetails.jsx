import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { FlexContainer, StyledTitle, PageContainer } from "../styles/styles";
import MyTaskOfferCard from "../components/client/MyTasksOfferCard";
import { taskByIdURL } from "../api/tasks";
import { userByUserIdURL } from '../api/users';
import { sendGetRequestById } from "../utils/utils";
import {
  approveProvider,
  editMapTime,
  deleteTask,
} from "../redux/actions/tasksActions";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import CardHeader from "@material-ui/core/CardHeader";
import RoomIcon from "@material-ui/icons/Room";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import StarsIcon from '@material-ui/icons/Stars';
import CardMedia from "@material-ui/core/CardMedia";
import { LOCAL_HOST_SERVER_URL } from '../api/utils';
import ImagePlaceholder from '../images/noimage-placeholder.jpg';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "1rem 0",
    "& .MuiDivider-root": {
      width: "100%",
    },
  },
  chipContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 2rem",
  },
  taskHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  deleteTaskButton: {
    marginTop: "1rem",
    margin: "auto",
    background: theme.palette.common.delete,
    color: theme.palette.common.text,
    borderColor: theme.palette.common.delete,
    borderRadius: "1rem",
  },
  showProgressButton: {
    marginTop: "1rem",
    margin: "auto",
    background: theme.palette.primary.main,
    color: theme.palette.common.text,
    borderColor: theme.palette.primary.main,
    borderRadius: "1rem",
  },
  showReviewButton: {
    marginTop: "1rem",
    margin: "auto",
    background: theme.palette.common.review,
    color: theme.palette.common.text,
    borderColor: theme.palette.common.review,
    borderRadius: "1rem",
  },
}));

const TaskDetails = () => {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const taskId = decodeURI(location.pathname.split("/")[2]);
  const [taskDetails, setTaskDetails] = useState({});
  const thisUser = useSelector((state) => state.user.user);
  const [isApproveVisible, setIsApproveVisible] = useState(false);
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const [isShowProgressVisible, setIsShowProgressVisible] = useState(false);
  const [isLeaveAReviewVisible, setIsLeaveAReviewVisible] = useState(false);
  const [winningOffer, setWinningOffer] = useState({});

  useEffect(() => {
    if (taskId != undefined)
      dispatch(sendGetRequestById(taskByIdURL(taskId), setTaskDetails));
  }, []);

  const [isActiveTask, setIsActiveTask] = useState(false);

  useEffect(() => {
    if (thisUser && taskDetails && Object.keys(taskDetails).length) {
      const isUserTaskCreator = thisUser._id === taskDetails.client._id;
      const isUserWinningOffer = thisUser._id === taskDetails.winningOffer?.provider._id;
      const isReviewPossible = taskDetails.mapReview === 'true' && taskDetails.isReviewed === 'false';

      const isCancel = isUserTaskCreator && taskDetails.isActive;
      const isApprove = isUserTaskCreator && taskDetails.isActive;
      const showProgress = (isUserWinningOffer || isUserTaskCreator) && !taskDetails.isActive && taskDetails.isReviewed === 'false' && taskDetails.mapReview === 'false';
      const leaveReview = isUserTaskCreator && !taskDetails.isActive && taskDetails.isReviewed === 'false' && taskDetails.mapReview === 'true';

      setIsApproveVisible(isApprove);
      setIsCancelVisible(isCancel);
      setIsShowProgressVisible(showProgress);
      setIsLeaveAReviewVisible(leaveReview);
      setIsActiveTask(taskDetails.isActive);

      if (taskDetails.winningOffer) {
        setWinningOffer(taskDetails.winningOffer);
      }
    }
  }, [thisUser, taskDetails]);

  const renderWinningOffer = () => {
    if (winningOffer && Object.keys(winningOffer).length) {
      return (
        <>
          <SubTitle
            color={theme.palette.common.approve}
          >{`Winning Offer`}</SubTitle>
          <MyTaskOfferCard offer={winningOffer} />
        </>
      )
    }
    return false;
  };

  const renderAllOffers = () => {
    if (taskDetails && isActiveTask && offers && offers.length) {
      return (
        <>
          <SubTitle color={theme.palette.common.pageTitle}>{`Offers`}</SubTitle>
          {offers.map((offer) => (
            <MyTaskOfferCard
              offer={offer}
              onApproveClick={onApproveClick}
              isApproveVisible={isApproveVisible}
            />
          ))}
        </>
      );
    }
    return (
      <SubTitle color={theme.palette.common.pageTitle}>{`No Offers`}</SubTitle>
    );
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = ImagePlaceholder;
  }

  const onApproveClick = (offer) => {
    const mapTime = new Date().getTime();
    dispatch(approveProvider(taskId, offer._id));
    dispatch(editMapTime(taskId, mapTime));
    setWinningOffer({
      ...offer,
      isWinningOffer: true,
    })
    setIsActiveTask(false);
    setIsCancelVisible(false);
    setIsShowProgressVisible(true);
  };

  const onCancelTaskClick = () => {
    dispatch(deleteTask(taskId));
    setTimeout(() => {
      history.push(`/mytasks`);
    }, 1500)
  };

  const onShowProgressClick = () => {
    history.push(`/progress/${taskId}`);
  };

  const onLeaveReviewClick = () => {
    history.push(`/addreview/${taskId}`)
  };

  const {
    taskTitle,
    offersCount,
    bestBID,
    taskDesiredPrice,
    taskDescription,
    offers,
  } = taskDetails;

  return (
    <PageContainer>
      {taskDetails && Object.keys(taskDetails).length > 0 && (
        <TaskFlexContainer>
          <Paper className={classes.paper}>
            <Container
              component="main"
              maxWidth="lg"
              className={classes.chipContainer}
            >
              <StyledChip
                variant="default"
                size="small"
                label={isActiveTask ? "Active" : "Not Active"}
                color={isActiveTask ? "primary" : ""}
              />
              <StyledChip
                variant="outlined"
                size="small"
                label={`Offers: ${offersCount}`}
              />
              <StyledChip
                variant="outlined"
                size="small"
                label={
                  bestBID ? `Best Bid: ${bestBID.priceByid}$` : "No Bids Yet"
                }
              />
            </Container>
            <Divider light />
            <Container
              component="main"
              maxWidth="lg"
              className={classes.taskHeader}
            >
              {taskDetails.client &&
                <CardHeader
                  avatar={
                    taskDetails.client ? (
                      <Avatar src={taskDetails.client.profileImage ? `${LOCAL_HOST_SERVER_URL}${taskDetails.client.profileImage}` : ''} className={classes.avatar} />
                    ) : (
                      <FaceIcon fontSize="inherit" />
                    )
                  }
                  title={taskDetails.client.userName}
                  subheader={`${taskDetails.client.firstName} ${taskDetails.client.lastName}`}
                />
              }
            </Container>
            <Divider light />
            <Container
              component="main"
              maxWidth="lg"
              className={classes.container}
            >
              <Typography
                variant="body1"
                component="h2"
                gutterBottom
                color="primary"
              >
                {taskTitle}
              </Typography>
              {taskDescription && taskDescription.length > 0 && (
                <DescriptionArea
                  backgroundColor={theme.palette.common.textArea}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`Description:`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {taskDescription}
                  </Typography>
                </DescriptionArea>
              )}
              <ImageContainer>
                <CardMedia
                  className={classes.media}
                  component="img"
                  onError={handleImageError}
                  image={taskDetails.taskImage ? `${LOCAL_HOST_SERVER_URL}${taskDetails.taskImage}` : ''}
                />
              </ImageContainer>
              <StyledChip
                variant="default"
                size="medium"
                label={`Desired price: ${taskDesiredPrice}$`}
                color="secondary"
              />
              {isCancelVisible && (
                <Button
                  variant="contained"
                  className={classes.deleteTaskButton}
                  startIcon={<HighlightOffIcon />}
                  onClick={onCancelTaskClick}
                  size="small"
                >
                  {`Cancel task`}
                </Button>
              )}
              {isShowProgressVisible && (
                <Button
                  variant="contained"
                  className={classes.showProgressButton}
                  startIcon={<RoomIcon />}
                  onClick={onShowProgressClick}
                  size="small"
                >
                  {`Show progress`}
                </Button>
              )}
              {isLeaveAReviewVisible && (
                <Button
                  variant="contained"
                  className={classes.showReviewButton}
                  startIcon={<StarsIcon />}
                  onClick={onLeaveReviewClick}
                  size="small"
                >
                  {`Leave a review`}
                </Button>
              )}
            </Container>
          </Paper>
          {Object.keys(winningOffer).length > 0 ? renderWinningOffer() : renderAllOffers()}
        </TaskFlexContainer>
      )}
    </PageContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const DescriptionArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
`;

const SubTitle = styled(StyledTitle)`
  margin-top: 1rem;
`;

const TaskFlexContainer = styled(FlexContainer)`
`;

export default TaskDetails;
