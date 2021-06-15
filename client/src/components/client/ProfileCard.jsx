import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';
import PopoverMenu from '../ui-components/PopoverMenu';
import CardHeader from '@material-ui/core/CardHeader';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { AddProviderFav } from '../../redux/actions/usersActions'
import { DeleteProviderFav } from '../../redux/actions/usersActions'
import { Avatar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '1rem 0rem',
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
    width: theme.spacing(9),
    height: theme.spacing(9),
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
    padding: '1rem',
  },
  divider: {
    marginBottom: '1rem',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

const ProfileCard = ({ provider }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  var flag = Boolean(false);
  const user = useSelector(state => state.user.user);

  const fav = useSelector(state => {
    if (state.user.user.favorites != undefined) {
      return state.user.user.favorites.find(obj => obj._id === provider._id);
    }
  });

  const [isSelected, setIsSelected] = useState(fav);

  useEffect(() => {
    setIsSelected(fav);
  }, [fav])


  const handleClick = (e) => {
    let tempIsSelected = !isSelected;
    if (tempIsSelected) {
      dispatch(
        AddProviderFav(
          user._id,
          provider._id
        ));

    }
    else {
      dispatch(
        DeleteProviderFav(
          user._id,
          provider._id
        ));

    }
  };
  const menuItems = [
    {
      id: 1,
      title: 'Watch Profile',
      link: `/profile/${provider._id}`,
    },
  ]
  const renderSelectColor = () => isSelected ? "error" : "inherit";

  return (

    <Card className={classes.root}>
      {provider && (
        <>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}
                src={provider.profileImage ? `${LOCAL_HOST_SERVER_URL}${provider.profileImage}` : ''} />
            }
            title={provider.userName}
            subheader={`${provider.firstName} ${provider.lastName}`}
            action={
              <PopoverMenu menuItems={menuItems} />
            }
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Phone: {provider.phone}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Email: {provider.email}
              <Typography variant="body2" color="textSecondary" component="p">
                About: {provider.about}
              </Typography>
            </Typography>

          </CardContent>

          {provider.categories != undefined && (
            <>
              <Divider light className={classes.divider} />
              <Container
                component="div"
                className={classes.chipContainer}
              >
                {provider.categories.map(
                  category =>
                    <StyledChip
                      variant="default"
                      size="small"
                      color="secondary"
                      label={category.categoryTitle}
                    />
                )}
              </Container>
            </>
          )}
        {!(user._id===provider._id)?(
          <CardActions className={classes.cardActions} >
          <IconButton aria-label="Add to favorites" onClick={handleClick}>
            <FavoriteIcon color={renderSelectColor()} />
          </IconButton>
            </CardActions>
        ):(<h1></h1>)}
        </>
      )}

    </Card>
  );
}

// const StayledTitle = styled(motion.div)`

// padding:1rem 1rem;
// h1{
//   font-size:3rem;
//   font-family:'Abril Fatface', cursive;
//   font-weight:lighter;
//   padding: 1rem 1rem;
//   text-align: center;
// }
// `;

const StyledChip = styled(Chip)`
  margin: 0.3rem;
`;

export default ProfileCard;