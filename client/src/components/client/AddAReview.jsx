import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CustomTextField from '../ui-components/CustomTextField';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { useHistory, useLocation } from 'react-router-dom';
import { reviewPost } from '../../redux/actions/reviewsActions';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { editIsReviewed } from '../../redux/actions/tasksActions';
import { loadTaskDetails } from '../../redux/actions/tasksActions';
import { notificationPost } from '../../redux/actions/notificationAction';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '3rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem',
  },
  secondTitle: {
    marginTop: '3rem',
  },
  avatar: {
    padding: '1.5rem',
    margin: '1rem 0',
    backgroundColor: theme.palette.secondary.main,
  },
  fieldsContainer: {
    width: '100%', // Fix IE 11 issue.
    margin: '1rem 0',
  },
  gridItem: {
    margin: '0.5rem 0',
  },
  categoryGridItem: {
    margin: '0.5rem 0',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  UploadImageGridItem: {
    margin: '3rem 0 0 0',
  },
  submit: {
    margin: '1rem 0',
  },
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
}));

const AddAReview = () => {

  const location = useLocation();
  const taskId = decodeURI(location.pathname.split('/')[2]);
  const taskDetails = useSelector(state => state.tasks.taskDetails.data);
  useEffect(() => {
    if (taskId != undefined) {
      dispatch(loadTaskDetails(taskId));
    }
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [reviewTitle, setTitle] = useState('');
  const [reviewDescription, setDescription] = useState('');
  const [value, setValue] = React.useState(4);
  const user = useSelector(state => state.user.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const content = 'You have new review from' + ' ' + user.userName + ' Go to Check!';
  var date = new Date();
  const [TitleError, setTitleError] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  }

  //---------------------------------------------------------------

  const validatee = () => {
    var err = false;

    if (reviewTitle.length < 3) {
      err = true;
      setTitleError(true);
    } else setTitleError(false);

    if (reviewDescription.length < 5) {
      err = true;
      setDescriptionError(true);
    } else setDescriptionError(false);

    return err;
  }

  const handlePostReviewClick = (e) => {
    const userId = user._id;
    const isReviewed = true;

    const err = validatee();
    e.preventDefault();
    if (!err) {
      dispatch(
        reviewPost(
          reviewTitle,
          reviewDescription,
          value,
          taskDetails.winningOffer.provider,
          userId
        ),
        notificationPost(
          content,
          date,
          userId

        ),
      );
      enqueueSnackbar('Thank you for your review');
      dispatch(editIsReviewed(taskId, isReviewed))
      history.push("/home");
    }
  }

  return (
    <Paper
      className={classes.paper}
      elevation={3}
    >
      <Container
        component="main"
        maxWidth="xs"
        className={classes.container}
      >
        <Avatar className={classes.avatar}>
          <SendIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ADD A REVIEW
        </Typography>
        <Grid
          container
          className={classes.fieldsContainer}
        >
          <Grid item xs={12} className={classes.gridItem}>
            <CustomTextField
              label='title'
              type='text'
              error={TitleError}
              helperText={TitleError ? "You must enter title..." : ' '}
              onChange={handleTitleInput}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <CustomTextField
              label='Tell us some more...'
              autoFocus={false}
              type='text'
              multiline='true'
              rows='5'
              rowsMax='5'
              error={DescriptionError}
              helperText={DescriptionError ? "You must tell us more..." : ' '}
              onChange={handleDescriptionInput}
            />
          </Grid>
        </Grid>
        <Box component="fieldset" mb={2} borderColor="transparent" >

          <Rating name="size-large"

            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }} />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handlePostReviewClick}
        >
          POST REVIEW
      </Button>

      </Container>

    </Paper>
  );
}

export default AddAReview;