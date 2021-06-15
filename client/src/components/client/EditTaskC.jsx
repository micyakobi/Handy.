import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import CategoryChip from "../ui-components/CategoryChip";
import { useHistory } from "react-router-dom";
import { editTask, loadMyTasks } from "../../redux/actions/tasksActions";
import { loadAllCategories } from "../../redux/actions/categoriesActions";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';


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

const EditTaskC = ({ task }) => {

  const classes = useStyles();
  const history = useHistory();
  const inputFile = useRef(null)
  const dispatch = useDispatch();

  const [taskTitle, setTitle] = useState(task.taskTitle);
  const [taskDescription, setDescription] = useState(task.taskDescription);
  const [taskDesiredPrice, setDesiredPrice] = useState(task.taskDesiredPrice);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [imageInput, setImageInput] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [isError, setIsError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [TitleError, setTitleError] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);
  const [PriceError, setPriceError] = useState(false);

  useEffect(() => {
    dispatch(loadAllCategories());
  }, []);

  const validatee = () => {
    var err = false;

    if (taskTitle.length < 3) {
      err = true;
      setTitleError(true);
    } else setTitleError(false);

    if (taskDescription.length < 5) {
      err = true;
      setDescriptionError(true);
    } else setDescriptionError(false);

    if (taskDesiredPrice === 0) {
      err = true;
      setPriceError(true);
    } else setPriceError(false);

    return err;
  }

  //--------------------------------------------------------

  const allCategories = useSelector((state) => state.categories.allCategories);

  useEffect(() => {
    task.categories.map((cat) => {
      setSelectedCategories({
        ...selectedCategories,
        [cat._id]: cat.categoryTitle,
      });
    })
  }, []);

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceInput = (e) => {
    setDesiredPrice(e.target.value);
  };

  const isSelectedCategory = (categoryId) => {
    for (let category of task.categories) {
      if (category._id === categoryId) return true;
    }
    return false;
  }

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
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
    setImageInput(e.target.files[0]);
  };

  const cat = [];
  for (const [key, value] of Object.entries(selectedCategories)) {
    cat.push({ _id: key });
  }

  //---------------------------------------------------------------

  const handleEditTaskClick = (e) => {

    const err = validatee();
    e.preventDefault();
    if (!err) {
      dispatch(
        editTask(
          taskTitle,
          taskDescription,
          taskDesiredPrice,
          cat,
          user._id,
          imageInput,
          user.firstName,
          user.lastName,
          task._id
        ),
        dispatch(loadMyTasks(user._id))
      );

      setTimeout(() => {
        history.push("/mytasks");
      }, 4000);
    } else { }

  };

  const onImageUploadClick = () => {
    inputFile.current.click();
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      {task &&
        <>
          <Container component="main" maxWidth="xs" className={classes.container}>
            <Avatar className={classes.avatar}>
              <SendIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              EDIT TASK
        </Typography>
            <Grid container className={classes.fieldsContainer}>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id="outlined-helperText"
                  fullWidth
                  id="text"
                  label="What are you looking for?"
                  name="description"
                  defaultValue={task.taskTitle}
                  error={TitleError}
                  helperText={TitleError ? "Needs to be at least 3 characters long." : ' '}
                  onChange={handleTitleInput}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id="outlined-helperText"
                  fullWidth
                  id="description"
                  label="Tell us some more..."
                  name="description"
                  defaultValue={task.taskDescription}
                  error={DescriptionError}
                  helperText={DescriptionError ? "Needs to be at least 5 characters long." : ' '}
                  onChange={handleDescriptionInput}
                  variant="outlined"
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
                    defaultValue={task.taskDesiredPrice}
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
                    key={category._id}
                    category={category}
                    isSelectedCategory={isSelectedCategory(category._id)}
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
                    <Button
                      htmlFor={"upload-button"}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={onImageUploadClick}
                      startIcon={<PhotoCamera />}
                    >
                      Change Task Image
                </Button>
                  </label>
                </div>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleEditTaskClick}
              >
                EDIT TASK
          </Button>
            </Grid>
          </Container>
        </>
      }
    </Paper>
  );
};

export default EditTaskC;
