import React from 'react';
//Styles
import styled from 'styled-components';
//MUI Components
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex :999,
  },

}));


const BtnPostTask = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = (event) => {
    history.push('/posttask')
  };
  return (
    <>
      <Toolbar id="post-a-task" />
      <Zoom in={true}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
      <Fab color="secondary" variant="extended"  margin={2}>
       <AddIcon   />
           Post A Task   
         </Fab>
         </div>

         </Zoom>
    </>
  );
}


export default BtnPostTask