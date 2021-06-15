import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';
import { FlexContainer, PageContainer } from "../../styles/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    margin: '1rem 0',
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0",
    paddingBottom: "1rem",
  },
});

const MyOffersOfferCard = ({ offer }) => {

  const classes = useStyles();
  const { offerTitle, priceByid, isActive, description, isWinningOffer } =
    offer;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="task-image"
          height="150"
          image={offer.task.taskImage ? `${LOCAL_HOST_SERVER_URL}${offer.task.taskImage}` : ''}
          title="task-image"
        />
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            gutterBottom
          >
            {offerTitle}
          </Typography>
          <ChipArea>
            <CardContent>
              <StyledChip
                variant="default"
                size="small"
                label={isActive ? "Active" : "Not Active"}
                color={isActive ? "secondary" : ""}
              />
              <StyledChip
                variant="outlined"
                size="small"
                label={`My bid: ${priceByid} $`}
              />
              <StyledChip
                variant="outlined"
                size="small"
                label={
                  isWinningOffer
                    ? `Approved`
                    : isActive
                      ? `Pending`
                      : `Declined`
                }
              />
            </CardContent>
          </ChipArea>
          <Divider light />
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" variant="contained">
          {"Task Details"}
        </Button>
      </CardActions>
    </Card>

  );
};

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
`;

const ChipArea = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

export default MyOffersOfferCard;
