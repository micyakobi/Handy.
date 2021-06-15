import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CustomTextField from "../ui-components/CustomTextField";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CategoryChip from "../ui-components/CategoryChip";
import UploadImageButton from "../ui-components/UploadImageButton";
import { useHistory } from "react-router-dom";
import { taskPost, loadMyTasks } from "../../redux/actions/tasksActions";
import { loadAllCategories } from "../../redux/actions/categoriesActions";
import { useSelector, useDispatch } from "react-redux";
import { editLatLng } from "../../redux/actions/usersActions";
import { Input } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { showErrorModal } from '../../redux/actions/appStatusActions';
import { loadUser } from '../../redux/actions/usersActions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "100%",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: "5rem",
    width: '100%',
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0.5rem",
  },
  secondTitle: {
    fontSize: "1rem",
  },
  avatar: {
    padding: "1.5rem",
    margin: "1rem 0",
    backgroundColor: theme.palette.secondary.main,
  },
  fieldsContainer: {
    width: "100%", // Fix IE 11 issue.
    margin: "1rem 0",
  },
  gridItem: {
    margin: "0.5rem 0",
  },
  categoryGridItem: {
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  UploadImageGridItem: {
    margin: "2rem 0 0 0",
  },
  submit: {
    margin: "1rem 0",
  },
  root: {
    width: "100%",
    display: "flex",
    "& > *": {
      width: "100%",
    },
    "& .MuiButton-outlinedPrimary": {
      width: "100%",
    },
  },
}));

const PostTaskForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const inputFile = useRef(null)
  const dispatch = useDispatch();
  const [taskTitle, setTitle] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [taskDesiredPrice, setDesiredPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [imageInput, setImageInput] = useState("");
  const [isError, setIsError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [TitleError, setTitleError] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);
  const [PriceError, setPriceError] = useState(false);
  const [imageDisplay, setImageDisplay] = useState(null);

  useEffect(() => {
    dispatch(loadAllCategories());
  }, []);

  //--------------------------------------------------------
  const isInteger = /^[0-9]+$/;
  const validatee = () => {
    var err = false;

    if (taskTitle.length < 3) {
      err = true;
      setTitleError(true);
    } else setTitleError(false);

    if (taskDescription.length < 5 ) {
      err = true;
      setDescriptionError(true);
    } else setDescriptionError(false);

    if (taskDesiredPrice === 0 || isInteger.test(taskDesiredPrice) === false) {
      err = true;
      setPriceError(true);
    } else setPriceError(false);

    return err;
  }

  //--------------------------------------------------------

  const allCategories = useSelector((state) => state.categories.allCategories);

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceInput = (e) => {
    setDesiredPrice(e.target.value);
  };

  const handleSelectedCategory = (selected) => {
    if (selectedCategories.hasOwnProperty(selected._id)) {
      delete selectedCategories[selected._id];
    } else {
      setSelectedCategories({
        ...selectedCategories,
        [selected._id]: selected.categoryTitle,
      });
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImageDisplay(URL.createObjectURL(imageFile));
    setImageInput(imageFile);
  };


  const cat = [];
  for (const [key, value] of Object.entries(selectedCategories)) {
    cat.push({ _id: key });
  }

  //---------------------------------------------------------------

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSucces = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (!("gealocation" in navigator)) {
      onError({
        enableHighAccuracy: true,
        code: 0,
        message: "Gealocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSucces, onError, options);
  }, []);

  //---------------------------------------------------------------
  var LatLngError = false;
  const errorMessage = "You must share Location";

  const handlePostTaskClick = (e) => {

    if (location.error === undefined) {
      LatLngError = true;
    }

    if (LatLngError === true) {
      const locationLat = location.coordinates.lat;
      const locationLong = location.coordinates.lng;
      const id = user._id;
      const err = validatee();
      e.preventDefault();
      if (!err) {
        dispatch(
          taskPost(
            taskTitle,
            taskDescription,
            taskDesiredPrice,
            cat,
            user._id,
            imageInput,
            user.firstName,
            user.lastName,
            locationLat,
            locationLong
          ),
          dispatch(loadMyTasks(user._id))
        );
        dispatch(editLatLng(id, locationLat, locationLong));

        setTimeout(() => {
          history.push("/mytasks");
        }, 5000);
      } else { }
    } else {
      dispatch(showErrorModal(errorMessage));
    }
  };

  const onImageUploadClick = () => {
    inputFile.current.click();
  }

  return (

    <Paper className={classes.paper} elevation={3}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Avatar className={classes.avatar}>
          <SendIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          POST A TASK
        </Typography>
        <Grid container className={classes.fieldsContainer}>
          <Grid item xs={12} className={classes.gridItem}>
            <CustomTextField
              label="What are you looking for?"
              type="text"
              error={TitleError}
              helperText={TitleError ? "You must enter what you locking for..." : ' '}
              onChange={handleTitleInput}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <CustomTextField
              label="Tell us some more..."
              autoFocus={false}
              type="text"
              multiline="true"
              rows="5"
              rowsMax="5"
              error={DescriptionError}
              helperText={DescriptionError ? "You must tell us more deatils..." : ' '}
              onChange={handleDescriptionInput}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <FormControl className={classes.textField} variant="outlined">
              <TextField
                variant="outlined"
                fullWidth
                id="standard-number"
                label="Price in $"
                type="number"
                placeholder={'Desired Price...'}
                InputLabelProps={{
                  shrink: true,
                }}
                labelWidth={10}
                error={PriceError}
                helperText={PriceError ? "You must enter price ." : ' '}
                onChange={handlePriceInput}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography className={classes.secondTitle}>
          Let people know what kind of service you're looking for...
        </Typography>
        <Grid container className={classes.fieldsContainer}>
          <Grid item xs={12} className={classes.categoryGridItem}>
            {allCategories.map((category) => (
              <CategoryChip
                category={category}
                onSelect={handleSelectedCategory}
              />
            ))}
          </Grid>
          <Grid item xs={12} className={classes.UploadImageGridItem}>
            <input
              id="contained-button-file"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
              type="file"
            />
            <div className={classes.root}>
              <label htmlFor="contained-button-file">
                <Input
                  ref={inputFile}
                  type="file"
                  id="upload-button"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {!imageInput && !imageDisplay ? (
                  <Button
                    htmlFor={"upload-button"}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={onImageUploadClick}
                    startIcon={<PhotoCamera />}
                  >
                    Upload Task Image
                  </Button>
                ) : (
                  <Button
                    htmlFor={"upload-button"}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={onImageUploadClick}
                    startIcon={<CheckCircleOutlineIcon />}
                  >
                    Image saved
                  </Button>
                )}
              </label>
            </div>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handlePostTaskClick}
          >
            POST TASK
          </Button>
        </Grid>
      </Container>
    </Paper>

  );
};

export default PostTaskForm;
