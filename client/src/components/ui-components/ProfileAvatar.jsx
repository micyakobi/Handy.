import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import placeholderImage from '../../images/icon_profile.png'

const ProfileAvatar = ({ spacing = 7 }) => {

  const classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      width: theme.spacing(spacing),
      height: theme.spacing(spacing),
    },
  }))();

  return (
    <div className={classes.root}>
      <Avatar
        alt="profile" src={placeholderImage}
        className={classes.avatar}
      />
    </div>
  );
}

export default ProfileAvatar;
