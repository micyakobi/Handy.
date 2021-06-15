import React, { useState, useEffect } from 'react';
import { FlexContainer } from '../styles/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/usersActions';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { StyledLink, PageContainer } from '../styles/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const { isLogged } = useSelector(state => state.user);
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [isError, setisError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validate = () => {
    var err = false;

    if (passwordInput.length < 3) {
      err = true;
      setpasswordError(true);
    } else setpasswordError(false);

    if (emailInput.indexOf("@") === -1) {
      err = true;
      setemailError(true);
    } else setemailError(false);

    return err;
  }


  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

  const handleSignIn = (e) => {

    e.preventDefault();
    const err = validate();
    if (!err) {
      dispatch(signIn(emailInput, passwordInput, history, enqueueSnackbar));

    } else { }
  }

  return (
    <PageContainer>
      <FlexContainer>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
          </Typography>
            <form className={classes.form} noValidate onSubmit={handleSignIn}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailError ? "Requires vaild email." : ' '}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordError ? "Password needs to be atleast 3 characters long." : ' '}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
            </Button>
              <Grid container justify="center">
                <Grid item>
                  <StyledLink to="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </StyledLink>
                </Grid>
              </Grid>
            </form>
          </div>

        </Container>
      </FlexContainer>
    </PageContainer>

  );
}


export default SignIn;