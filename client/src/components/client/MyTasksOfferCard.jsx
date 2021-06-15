import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PopoverMenu from "../ui-components/PopoverMenu";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { sendGetRequestById } from "../../utils/utils";
import { reviewByProviderIdURL } from "../../api/reviews";
import {
  AddProviderFav,
  DeleteProviderFav,
} from "../../redux/actions/usersActions";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import ReviewsAccordion from "../ReviewsAccordion";
import { notificationPost } from "../../redux/actions/notificationAction";
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "1rem 2rem",
    padding: "0.5rem 0",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  favoriteButton: (props) => ({
    color: props.color,
    padding: '0.5rem',
  }),
  approveButton: {
    background: theme.palette.common.approve,
    color: theme.palette.common.text,
    borderColor: theme.palette.common.approve,
    borderRadius: "2rem",
    height: 24,
    boxShadow: 'none',
    marginRight: '0.2rem',
  },
}));

const MyTasksOfferCard = ({ offer, onApproveClick, isApproveVisible }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const thisUser = useSelector((state) => state.user.user);
  const [expanded, setExpanded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [provider, setProvider] = useState(offer.provider);
  var date = new Date();

  const content = thisUser.userName + ' ' + 'confirmed your offer ';

  useEffect(() => {
    if (offer.provider._id != undefined) {
      axios
        .get(reviewByProviderIdURL(offer.provider._id))
        .then((resp) => setReviews(resp.data));
    }
  }, []);

  const isFavoriteByLoggedUser = () => {
    if (thisUser && Object.keys(thisUser).length) {
      for (let fav of thisUser.favorites) {
        if (fav._id === provider._id) {
          return true;
        }
      }
    }
    return false;
  };

  const [isFavorite, setIsFavorite] = useState(isFavoriteByLoggedUser());

  const theme = useTheme();
  const styleProps = {
    color: isFavorite
      ? theme.palette.common.favorite
      : theme.palette.common.disabled,
  };
  const classes = useStyles(styleProps);

  const menuItems = [
    {
      id: 1,
      title: "Watch Profile",
      link: `/profile/${offer.provider._id}`,
    },
    {
      id: 2,
      title: "Go To Favorites",
      link: "/favorites",
    },
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleApproveClick = () => {
    onApproveClick(offer);
    dispatch(
      notificationPost(
        content,
        date,
        provider._id
      )
    )
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(DeleteProviderFav(thisUser._id, provider._id));
    } else {
      setIsFavorite(true);
      dispatch(AddProviderFav(thisUser._id, provider._id));
    }
  };

  return (
    <>
      {offer && thisUser && (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}
                src={offer.provider.profileImage ? `${LOCAL_HOST_SERVER_URL}${offer.provider.profileImage}` : ''} />
            }
            action={<PopoverMenu menuItems={menuItems} />}
            title={provider.userName}
            subheader={`${provider.firstName} ${provider.lastName}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {offer.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {isApproveVisible ? (
              <>
                <IconButton
                  aria-label="add to favorites"
                  className={classes.favoriteButton}
                  onClick={toggleFavorite}
                >
                  <FavoriteIcon />
                </IconButton>
                <Button
                  variant="contained"
                  className={classes.approveButton}
                  startIcon={<CheckCircleIcon />}
                  onClick={handleApproveClick}
                  size="small"
                >
                  {`${offer.priceByid} $`}
                </Button>
              </>
            ) : (
              <StyledChip
                variant="outlined"
                size="small"
                label={`offered: ${offer.priceByid}$`}
                color="primary"
              />
            )}
            <StyledChip
              icon={<LocationOnIcon />}
              variant="default"
              size="small"
              label={`${Math.floor(offer.distanceFromOfferToTask)} km`}
              color="secondary"
            />
            <StyledChip
              icon={<StarIcon />}
              size="small"
              label={parseInt(offer.provider.avgRating)}
              color="secondary"
            />
            {reviews.length > 0 && (
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            )}
          </CardActions>
          {reviews.length > 0 && (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {reviews.slice(0, 5).map((review) => (
                  <ReviewsAccordion reviews={review} />
                ))}
              </CardContent>
            </Collapse>
          )}
        </Card>
      )}
    </>
  );
};

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
`;

export default MyTasksOfferCard;
