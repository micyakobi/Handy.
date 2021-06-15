import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    '& > *': {
      width: '100%',
    },
    '& .MuiButton-outlinedPrimary': {
      width: '100%',
    }
  },
  input: {
    display: 'none',
  },
}));

const UploadImageButton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="outlined"
          color="primary"
          component="span"
          startIcon={<PhotoCamera />}
        >
          Upload Task Image
        </Button>
      </label>
    </div>
  );
}

export default UploadImageButton;