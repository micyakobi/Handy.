import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { hideErrorModal } from '../redux/actions/appStatusActions';

const generalErrorMsg = 'There was an error.';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline: 'none',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1rem',
    boxShadow: 'none',
    width: '400px',
    minHeight: '200px',
    background: 'none',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginTop: '2rem',
    padding: '0.4rem 2rem',
  },
}));

const ErrorModal = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const errorModal = useSelector(state => state.appStatus.errorModal)

  const handleClose = () => {
    dispatch(hideErrorModal());
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={errorModal.showErrorModal}
        disableScrollLock={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={errorModal.showErrorModal}>
          <Paper className={classes.paper}>
            <p>{generalErrorMsg}</p>
            <p>{errorModal.errorMessage}</p>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              OK
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

export default ErrorModal;