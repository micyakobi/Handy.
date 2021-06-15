import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeProps from './styles/theme';
import Navbar from './components/layout/Navbar';
import SideBar from './components/layout/SideBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeLogIn from './pages/HomeLogIn';
import Favorites from './pages/client/Favorites';
import FindHandy from './pages/client/FindHandy';
import SignIn from './pages/SignIn';
import MyTasks from './pages/client/MyTasks';
import MyTasksfromLogIn from './pages/client/MyTasksfromLogIn';
import PostTask from './pages/client/PostTask';
import EditProfile from './components/EditProfile'
import TaskFeed from './pages/provider/TaskFeed';
import SignUp from './pages/SignUp';
import SubmitTaskOffer from './pages/provider/SubmitTaskOffer';
import MyOffers from './pages/provider/MyOffers';
import AddReview from './components/client/AddAReview'
import { motion } from 'framer-motion';
import ShowProgress from './pages/ShowProgress';
import Profile from './pages/Profile';
import category from './pages/client/Category'
import TaskDetails from './pages/TaskDetails';
import MainGoogleMap from './components/MainGoogleMap';
import BtnPostTask from './components/client/BtnPostTask';
import About from './pages/About';
import Loader from './components/Loader';
import ErrorModal from './components/ErrorModal';
import EditTask from './pages/client/EditTask';


const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const theme = createMuiTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles theme={theme} />
        <SideBar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <ErrorModal />
        <Loader />
        <Switch>
          <StyledContainer>
            <StyledContent>
              <Route exact path="/" component={Home} exact />
              <Route exact path="/home" component={HomeLogIn} />
              <Route exact path="/profile/:userId" component={Profile} />
              <Route exact path="/findhandy" component={FindHandy} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/editprofile/:id" component={EditProfile} />
              <Route exact path="/mytasks" component={MyTasks} />
              <Route exact path="/editTask/:id" component={EditTask} />
              <Route exact path="/mytaskshome" component={MyTasksfromLogIn} />
              <Route exact path="/about" component={About} />
              <Route exact path="/posttask" component={PostTask} />
              <Route exact path="/taskfeed" component={TaskFeed} />
              <Route exact path="/submitoffer/:taskId" component={SubmitTaskOffer} />
              <Route exact path="/findhandy/:catgoryid" component={category} />
              <Route exact path="/myoffers" component={MyOffers} />
              <Route exact path="/addreview/:id" component={AddReview} />
              <Route exact path="/progress/:id" component={ShowProgress} />
              <Route exact path="/TaskDetails/:taskId" component={TaskDetails} />
              <Route exact path="/mainMap" component={MainGoogleMap} />
            </StyledContent>
          </StyledContainer>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const StyledContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledContent = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default App;
