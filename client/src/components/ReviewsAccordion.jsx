import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FaceIcon from "@material-ui/icons/Face";
import { useSelector } from "react-redux";
import { LOCAL_HOST_SERVER_URL } from '../api/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
    width: "100%",
    boxShadow: 'none',
    padding: '0.5rem',
    backgroundColor: theme.palette.common.reviewCard,
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ReviewsAccordion = ({ reviews }) => {
  const classes = useStyles();

  console.log(reviews);

  return (
    <>
      <Card className={classes.root}>
        {reviews.client && (
          <>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}
                  src={reviews.client.profileImage ? `${LOCAL_HOST_SERVER_URL}${reviews.client.profileImage}` : ''} />

              }
              title={reviews.client.userName}
              subheader={`${reviews.client.firstName} ${reviews.client.lastName}`}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {reviews.reviewTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {reviews.reviewContent}
              </Typography>
            </CardContent>
            <Rating
              name="size-large"
              defaultValue={parseInt(reviews.rating)}
              readOnly
              size="large"
            />
          </>
        )}
      </Card>
    </>
  );
};

export default ReviewsAccordion;
