import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Loader = () => {
  const classes = useStyles();
  const showLoader = useSelector(state => state.appStatus.showLoader);

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence exitBeforeEnter>
        {showLoader && (
          <motion.div
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          >
            <Backdrop className={classes.backdrop} open={showLoader}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const fade = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        ease: 'easeOut',
        duration: 0.75,
      },
    },
  };

export default Loader;