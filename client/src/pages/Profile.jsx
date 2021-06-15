import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import { FlexContainer, StyledTitle } from "../styles/styles";
import ProfileAvatar from "../components/ui-components/ProfileAvatar";
import GeneralButton from "../components/ui-components/GeneralButton";
import EditIcon from "@material-ui/icons/Edit";
import ReviewsAccordion from "../components/ReviewsAccordion";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import { getUserById } from "../api/users";
import axios from "axios";
import { reviewByProviderIdURL } from "../api/reviews";
import { Avatar } from "@material-ui/core";
import { LOCAL_HOST_SERVER_URL } from '../api/utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: '3rem 0 1rem 0',
    "& .MuiDivider-root": {
      width: "100%",
    },
    width: '100%',
  },
  headContainer: {
    display: "flex",
    flexDirection: "row",
    padding: '2rem 1rem',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  chipContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
  },
  divider: {
    marginBottom: '1rem',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const Profile = () => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const userId = decodeURI(location.pathname.split("/")[2]);
  const [reviews, setReviews] = useState([]);
  const isLoading = useSelector(state => state.appStatus.showLoader);
  const [userDetails, setUserDetails] = useState({});
  const thisUserDetails = useSelector(state => state.user.user)
  const userCategories = useSelector(state => state.user.userCategories);

  useEffect(() => {
    if (userId != undefined) {
      async function doSomething() {
        const userProfile = await axios.get(getUserById(userId));
        setUserDetails(userProfile.data);
      }
      doSomething();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && thisUserDetails._id === userId) {
      setUserDetails(thisUserDetails);
    }
  }, [isLoading]);

  useEffect(() => {
    if (userId != undefined) {
      axios
        .get(reviewByProviderIdURL(userId))
        .then((resp) => setReviews(resp.data));
    }
  }, []);

  const handleEditClick = () => {
    history.push("/editprofile/" + userDetails._id);
  };

  return (
    <FlexContainer>
      { Object.keys(userDetails).length > 0 && (
        <FlexContainer>
          <StyledTitle color={theme.palette.common.pageTitle}>Profile</StyledTitle>
          <Paper className={classes.paper}>
            <Container component="div" className={classes.headContainer}>
              <Container component="div" className={classes.avatarContainer}>
                <Avatar
                  className={classes.avatar}
                  src={userDetails.profileImage ? `${LOCAL_HOST_SERVER_URL}${userDetails.profileImage}` : ''}
                />
              </Container>
              <Container component="div" className={classes.detailsContainer}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="primary"
                >
                  {userDetails.userName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  color="secondary"
                  gutterBottom
                >
                  {`${userDetails.firstName} ${userDetails.lastName}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {userDetails.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {userDetails.email}
                </Typography>
                {userDetails.about && (
                  <Typography variant="body2" color="textSecondary" component="p">
                    {userDetails.about}
                  </Typography>
                )}
                {thisUserDetails._id === userId ? (
                  <GeneralButton
                    Icon={EditIcon}
                    label="Edit"
                    style={{ marginTop: "1rem" }}
                    onClick={handleEditClick}
                  />
                ) : (
                  <h3></h3>
                )}
              </Container>
            </Container>

            {userCategories.length > 0 && (
              <>
                <Divider light className={classes.divider} />
                <Container component="div" className={classes.chipContainer}>
                  {userCategories.map((category) => (
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
          </Paper>

          {thisUserDetails.isProvider && reviews.length > 0
            ? (reviews.map((review) => <ReviewsAccordion reviews={review} />))
            : (
              Object.keys(userDetails).length > 0 && userDetails.isProvider ? (
                <SpacedTitle color={theme.palette.common.pageTitle}>{"No reviews."}</SpacedTitle>
              ) : (<h1 />)
            )}

        </FlexContainer>
      )}
    </FlexContainer>
  );
};

const StyledChip = styled(Chip)`
  margin: 0.3rem;
`;

const SpacedTitle = styled(StyledTitle)`
  margin-top: 3rem;
`;

export default Profile;
