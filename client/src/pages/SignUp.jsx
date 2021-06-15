import React, { useState, useEffect } from 'react';
import { FlexContainer, PageContainer } from '../styles/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CategoryChip from '../components/ui-components/CategoryChip'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/usersActions';
import { useHistory } from 'react-router-dom';
import { loadAllCategories } from '../redux/actions/categoriesActions';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { Input } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  uploadImageButton: {
    margin: '1rem 0',
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    flexDirection: "column",
  },
  profileImage: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    display: 'none',
  },
}));

const SignUp = () => {

  const history = useHistory();
  const classes = useStyles();
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [PhoneNumberInput, setPhoneNumberInput] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  const [PasswordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCategories, setSelectedCategories] = useState({});
  const allCategories = useSelector(state => state.categories.allCategories);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [imageInput, setImageInput] = useState(null);

  useEffect(() => {
    dispatch(loadAllCategories());
  }, []);

  const [isError, setisError] = useState(false);
  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [PhoneNumberError, setPhoneNumberError] = useState(false);
  const [UserNameError, setUserNameError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [EmailError, setEmailError] = useState(false);

  const handleImageChange = (e) => {
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
    setImageInput(e.target.files[0]);
  };

  const isInteger = /^[0-9]+$/;
  const validate = () => {
    var err = false;

    if (firstNameInput.length < 2) {
      err = true;
      setFirstNameError(true);
    } else setFirstNameError(false);

    if (lastNameInput.length < 2) {
      err = true;
      setLastNameError(true);
    } else setLastNameError(false);

    if (PhoneNumberInput.length < 10 || isInteger.test(PhoneNumberInput) === false) {
      err = true;
      setPhoneNumberError(true);
    } else setPhoneNumberError(false);

    if (userNameInput.length < 3) {
      err = true;
      setUserNameError(true);
    } else setUserNameError(false);

    if (PasswordInput.length < 3) {
      err = true;
      setPasswordError(true);
    } else setPasswordError(false);

    if (emailInput.indexOf("@") === -1) {
      err = true;
      setEmailError(true);
    } else setEmailError(false);

    return err;
  }

  //------------------------------------------------------


  const [state, setState] = React.useState({
    client: false,
    provider: false
  });

  const handleFirstNameInput = (e) => {
    setFirstNameInput(e.target.value);
  }
  const handleLastNameInput = (e) => {
    setLastNameInput(e.target.value);
  }

  const handlePhoneNumberInput = (e) => {
    setPhoneNumberInput(e.target.value);
  }

  const handleUserNameInput = (e) => {
    setUserNameInput(e.target.value);
  }
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  }
  const handleDesciptionInput = (e) => {
    setDescriptionInput(e.target.value);
  }


  const handleClient = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

  };
  const handleProvider = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { client, provider } = state;

  const handleSelectedCategory = (selected) => {
    if (selectedCategories.hasOwnProperty(selected._id)) {
      delete selectedCategories[selected._id];
    } else {
      setSelectedCategories({
        ...selectedCategories,
        [selected._id]: selected.categoryTitle,
      })
    }
  }


  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const cat = [];
    const localCategories = [];
    for (const [key, value] of Object.entries(selectedCategories)) {
      cat.push({ _id: key });
      localCategories.push({ _id: key, categoryTitle: value });
    }
    const err = validate();
    if (state.client || state.provider) {
      if (!err) {
        dispatch(
          signUp(
            firstNameInput,
            lastNameInput,
            userNameInput,
            PasswordInput,
            PhoneNumberInput,
            emailInput,
            descriptionInput,
            client,
            provider,
            cat,
            history,
            imageInput,
            localCategories,
          )
        );
      } else { }
    }
    else {
      enqueueSnackbar('Client or provider field is required');

    }

  }

  return (
    <PageContainer>
      <FlexContainer>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSignUpSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Container component="div" className={classes.profileImageContainer}>
                    <Avatar src={imageDisplay} className={classes.profileImage} />
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={FirstNameError}
                    helperText={FirstNameError ? "First Name needs to be atleast 2 characters long." : ' '}
                    onChange={handleFirstNameInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    error={LastNameError}
                    helperText={LastNameError ? "Last Name needs to be atleast 2 characters long." : ' '}
                    onChange={handleLastNameInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="phone"
                    label="Phone number"
                    name="Phone number"
                    autoComplete="Phone number"
                    error={PhoneNumberError}
                    helperText={PhoneNumberError ? "Phone Number needs to be at least 10 numbers long." : ' '}
                    onChange={handlePhoneNumberInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="username"
                    label="User name"
                    name="User name"
                    autoComplete="User name"
                    error={UserNameError}
                    helperText={UserNameError ? "User Name needs to be atleast 3 characters long." : ' '}
                    onChange={handleUserNameInput}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={EmailError}
                    helperText={EmailError ? "Requires vaild email." : ' '}
                    onChange={handleEmailInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required={true}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={PasswordError}
                    helperText={PasswordError ? "Password needs to be at least 3 numbers long." : ' '}
                    onChange={handlePasswordInput}
                  />
                </Grid>
              </Grid>

              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={client} onChange={handleClient} name="client" />}
                    label="Client"
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={provider} onChange={handleProvider} name="provider" />}
                    label="Provider"
                  />
                </FormGroup>
              </FormControl>
              {provider ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      variant="outlined"
                      required={true}
                      fullWidth
                      id="Desciption"
                      label="Desciption"
                      name="Desciption"
                      autoComplete="Desciption"
                      onChange={handleDesciptionInput}
                    />
                  </Grid>
                  <h4>Choose your favorite categories</h4>
                  <Grid

                    item xs={12}
                    className={classes.categoryGridItem}
                  >
                    {allCategories.map(category =>
                      <CategoryChip
                        category={category}
                        onSelect={handleSelectedCategory}
                      />
                    )}

                  </Grid>

                </Grid>
              ) : (<h3 />)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign Up
          </Button>
            </form>
          </div>
        </Container>
      </FlexContainer>
    </PageContainer>

  );
}


export default SignUp;







