import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PopoverMenu from '../ui-components/PopoverMenu';
import { DeleteProviderFav } from '../../redux/actions/usersActions';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '1rem 0'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  favoriteButton: {
    color: theme.palette.common.favorite,
  },
  approveButton: {
    marginLeft: '0.5rem',
    color: theme.palette.common.approve,
    borderColor: theme.palette.common.approve,
    borderRadius: '2rem',
  }, cardActions: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '1rem',
  },
  divider: {
    margin: '1rem 0',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

const FavoritesHandiesCard = ({ handyId, userName, firstName, lastName, email, phone, about, image, categories }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(true);
  const user = useSelector(state => state.user.user);
  const clientId = user._id;

  useEffect(() => {
    setIsSelected(isSelected);
  }, [isSelected])

  const handleClick = (e) => {
    setIsSelected(!isSelected);
    dispatch(
      DeleteProviderFav(
        clientId,
        handyId
      ));
  }

  const renderSelectColor = () => isSelected ? "error" : "inherit";

  const menuItems = [
    {
      id: 1,
      title: 'Watch Profile',
      link: `/profile/${handyId}`,
    },
  ]

  return (

    <Card className={classes.root}>
      <>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}
              src={image ? `${LOCAL_HOST_SERVER_URL}${image}` : ''} />

          }
          title={userName}
          subheader={`${firstName} ${lastName}`}
          action={
            <PopoverMenu menuItems={menuItems} />
          }
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone: {phone}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Email: {email}
            <Typography variant="body2" color="textSecondary" component="p">
              About: {about}
            </Typography>
          </Typography>

        </CardContent>

        {categories != undefined && (
          <>
            <Divider light className={classes.divider} />
            <Container
              component="div"
              className={classes.chipContainer}
            >
              {categories.map(
                category =>
                  <StyledChip
                    variant="default"
                    size="small"
                    color="secondary"
                    label={category.categoryTitle}
                  />
              )}
            </Container>
            <Divider light className={classes.divider} />

          </>
        )}
        <CardActions className={classes.cardActions} >
          <IconButton aria-label="Add to favorites" onClick={handleClick}>
            <FavoriteIcon color={renderSelectColor()} />
          </IconButton>
        </CardActions>
      </>
    </Card>
  );
}


const StyledChip = styled(Chip)`
  margin: 0.3rem;
`;

export default FavoritesHandiesCard;
