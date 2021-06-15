import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllUsers } from '../../redux/actions/usersActions';
import { offerPost, loadMyOffers } from '../../redux/actions/offersActions';
import { FlexContainer } from '../../styles/styles';
import { loadTaskDetails } from '../../redux/actions/tasksActions';
import { editLatLng } from '../../redux/actions/usersActions';


//----------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { notificationPost } from '../../redux/actions/notificationAction';
import { taskByIdURL } from '../../api/tasks';
import { sendGetRequestById } from "../../utils/utils";
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import { showErrorModal } from '../../redux/actions/appStatusActions';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  divider: {
    margin: '1rem 0',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  submit: {
    margin: 0,
  },

}));

//-------------------------------------------------------------------------------

const SubmitOfferForm = ({ taskId }) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //---------------------

  const dispatch = useDispatch();
  useEffect(() => {
    if (taskId != undefined) {
      dispatch(loadTaskDetails(taskId));
    }
  }, [])

  const taskDetails = useSelector(state => state.tasks.taskDetails.data);
  const history = useHistory();
  const [moneyInput, setMoneyInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const userLogIn = useSelector(state => state.user.user);
  const [isError, setisError] = useState(false);
  const [MoneyError, setMoneyError] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);

  var date = new Date();

  const [task, setTask] = useState({});
  useEffect(() => {
    if (taskId != undefined) {
      dispatch(sendGetRequestById(taskByIdURL(taskId), setTask));
    }
  }, []);
  const content = 'You have new Offer from' + ' ' + userLogIn.userName + ' Go to Check!';

  //--------------------------------------------------------------- 
  const isInteger = /^[0-9]+$/;
  const validate = () => {
    var err = false;

    if (moneyInput.length < 1 || isInteger.test(moneyInput) === false) {
      err = true;
      setMoneyError(true);
    } else setMoneyError(false);

    if (descriptionInput.length < 5) {
      err = true;
      setDescriptionError(true);
    } else setDescriptionError(false);

    return err;
  }

  //---------------------------------------------------------------

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" }
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
    maximumAge: 0
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
  }, [])

  //-------------------------------------------------------------------------------

  const handlDescriptionInput = (e) => {
    setDescriptionInput(e.target.value);
  }

  const handlMoneyInput = (e) => {
    setMoneyInput(e.target.value);
  }

  //---------------------------------------------------------------------------------

  var LatLngError = false;
  const errorMessage = "You must share Location";

  const handleSubmit = (e) => {

    if (location.error === undefined) {
      LatLngError = true;
    }

    if (LatLngError === true) {
      const locationLat = location.coordinates.lat;
      const locationLong = location.coordinates.lng;
      const id = userLogIn._id;
      e.preventDefault();
      const err = validate();
      if (!err) {
        dispatch(
          offerPost(
            taskDetails.taskTitle,
            descriptionInput,
            moneyInput,
            userLogIn._id,
            taskId,
            locationLat,
            locationLong
          ),
          dispatch(
            notificationPost(
              content,
              date,
              taskDetails.client._id
            ),
          ),
          dispatch(
            editLatLng(
              id,
              locationLat,
              locationLong
            )
          ),
          loadMyOffers(id)
        );

        setTimeout(() => {
          history.push("/myoffers");
        }, 5000)
      } else { }
    } else {
      dispatch(showErrorModal(errorMessage));
    }

  }

  return (
    <FlexContainer>
      {taskDetails && (
        <>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar src={taskDetails.client.profileImage ? `${LOCAL_HOST_SERVER_URL}${taskDetails.client.profileImage}` : ''} />
              }
              title={taskDetails.taskTitle}
              subheader={taskDetails.userName}
            />
            <CardMedia
              className={classes.media}
              image={taskDetails.taskImage ? `${LOCAL_HOST_SERVER_URL}${taskDetails.taskImage}` : ''}
              title={taskDetails.taskTitle}

            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {taskDetails.taskDescription}
              </Typography>
              {taskDetails.taskDesiredPrice}$
            </CardContent>

            {taskDetails.categories != undefined && (
              <>
                <Divider light className={classes.divider} />
                <Container
                  component="div" className={classes.chipContainer} >
                  {taskDetails.categories.map(
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



            <StyledProviderSide>
              <TextField
                variant="outlined"
                fullWidth
                id="standard-number"
                label="Price in $"
                type="number"
                placeholder={'offer your bid amount here...'}
                value={moneyInput}
                InputLabelProps={{
                  shrink: true,
                }}
                labelWidth={10}
                error={MoneyError}
                helperText={MoneyError ? "You must enter price ." : ' '}
                onChange={handlMoneyInput}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="Your Message"
                label="Your Message"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder={'Write a message for the provider...'}
                value={descriptionInput}
                error={DescriptionError}
                helperText={DescriptionError ? "You must enter description ." : ' '}
                onChange={handlDescriptionInput}
              />
            </StyledProviderSide>
            <StyledProviderSide>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Submit
            </Button>
            </StyledProviderSide>
          </Card>
        </>
      )}
    </FlexContainer>

  );
};

const StyledChip = styled(Chip)`
  margin: 0.3rem;
`;

const StyledProviderSide = styled(motion.div)`
  text-align: center;
  padding: 1rem;
`;

const StyledButton = styled(motion.button)`
padding: 1rem;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1.1.rem;
  cursor: pointer;
  padding: 1rem 2rem ;
  border: 1px solid #262626;
  background: #00A1D6;
  color: white;
  transition: all 0.5s ease;
  font-family: 'Inter', sans-serif;
  &:hover{
      background-color: #262626;
      color: white;
  }
`;


export default SubmitOfferForm;