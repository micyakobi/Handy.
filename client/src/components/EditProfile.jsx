import React, { useState, useEffect } from "react";
import { FlexContainer } from "../styles/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { loadAllCategories } from "../redux/actions/categoriesActions";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CategoryChip from "../components/ui-components/CategoryChip";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../redux/actions/usersActions";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Avatar } from "@material-ui/core";
import { LOCAL_HOST_SERVER_URL } from '../api/utils';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryGridItem: {
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    color: "primary",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  uploadImageButton: {
    margin: '1rem 0',
  },
  input: {
    display: 'none',
  },
}));

const EditProfile = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [firstNameInput, setFirstNameInput] = useState(user.firstName);
  const [userNameInput, setuserNameInput] = useState(user.userName);
  const [imageInput, setImageInput] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [aboutInput, setAboutInput] = useState(user.userName);
  const [PhoneNumberInput, setPhoneNumberInput] = useState(user.phone);
  const [lastNameInput, setLastNameInput] = useState(user.lastName);
  const [emailInput, setEmailInput] = useState(user.email);
  const [passwordInput, setPasswordInput] = useState(user.password);
  const allCategories = useSelector((state) => state.categories.allCategories);
  const { enqueueSnackbar } = useSnackbar();
  const userCategories = useSelector(state => state.user.userCategories);
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    const selectedCat = {};
    for (let category of userCategories) {
      selectedCat[category._id] = category.categoryTitle;
    }
    setSelectedCategories(
      selectedCat
    )
  }, [user]);

  const [state, setState] = React.useState({
    client: user.isClient,
    provider: user.isProvider,
  });
  useEffect(() => {
    dispatch(loadAllCategories());
  }, []);

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleuserNameChange = (e) => {
    setuserNameInput(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstNameInput(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAboutInput(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastNameInput(e.target.value);
  };
  const handleImageChange = (e) => {
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
    setImageInput(e.target.files[0]);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumberInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleClient = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleProvider = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { client, provider } = state;

  const isSelectedCategory = (categoryId) => {
    for (let category of userCategories) {
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

  const handleEditProfile = (e) => {
    const id = user._id;
    const cat = [];
    const localCategories = [];
    for (const [key, value] of Object.entries(selectedCategories)) {
      cat.push({ _id: key });
      localCategories.push({ _id: key, categoryTitle: value });
    }
    e.preventDefault();
    if (state.client || state.provider) {
      dispatch(
        editProfile(
          id,
          firstNameInput,
          lastNameInput,
          userNameInput,
          PhoneNumberInput,
          emailInput,
          passwordInput,
          aboutInput,
          client,
          provider,
          imageInput,
          cat,
          localCategories,
        )
      );
      history.push("/profile/" + user._id);

    }
    else {
      enqueueSnackbar('Client or provider field is required');
    }
  };

  return (
    <FlexContainer>
      {Object.keys(user).length > 0 && (
        <Paper>
          <Container component="main" maxWidth="xs">
            <form
              className={classes.form}
              noValidate
              onSubmit={handleEditProfile}
            >
              <div className={classes.paper}>
                <Container component="div" className={classes.avatarContainer}>
                  <Avatar src={imageDisplay ? imageDisplay : `${LOCAL_HOST_SERVER_URL}${user.profileImage}`} className={classes.avatar} />
                  <input
                    className={classes.input}
                    id="contained-button-file"
                    onChange={handleImageChange}
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    {!imageInput && !imageDisplay ? (
                      <Button
                        className={classes.uploadImageButton}
                        variant="contained"
                        color="secondary"
                        component="span"
                        startIcon={<PhotoCamera />}
                      >
                        Upload image
                      </Button>
                    ) : (
                      <Button
                        className={classes.uploadImageButton}
                        variant="contained"
                        color="secondary"
                        component="span"
                        startIcon={<CheckCircleOutlineIcon />}
                      >
                        Image saved
                      </Button>
                    )}
                  </label>
                </Container>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      id="username"
                      label="User name"
                      name="User name"
                      defaultValue={user.userName}
                      onChange={handleuserNameChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      defaultValue={user.firstName}
                      onChange={handleFirstNameChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      defaultValue={user.lastName}
                      onChange={handleLastNameChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      defaultValue={user.email}
                      onChange={handleEmailChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      id="phone"
                      label="Phone number"
                      name="Phone number"
                      defaultValue={user.phone}
                      onChange={handlePhoneChange}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      defaultValue={user.password}
                      onChange={handlePasswordChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-helperText"
                      fullWidth
                      id="about"
                      label="about"
                      name="about"
                      defaultValue={user.about}
                      onChange={handleAboutChange}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={client}
                          onChange={handleClient}
                          name="client"
                        />
                      }
                      label="Client"
                    />
                  </FormGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={provider}
                          onChange={handleProvider}
                          name="provider"
                        />
                      }
                      label="Provider"
                    />
                  </FormGroup>
                </FormControl>
                {provider ? (
                  <Grid item xs={12} className={classes.categoryGridItem}>
                    {allCategories && allCategories.map((category) => (
                      <CategoryChip
                        category={category}
                        onSelect={handleSelectedCategory}
                        isSelectedCategory={isSelectedCategory(category._id)}
                      />
                    ))}
                  </Grid>

                ) : (<h1 />)}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Submit changes
                </Button>
              </div>
            </form>
          </Container>
        </Paper>
      )}
    </FlexContainer>
  );
};

export default EditProfile;
