import React, { useState, useEffect } from 'react';
import {
  MobileIcon, NavMenu, NavItem, NavLinks,
  NavBtn, NavBtnLink, RingIcon
} from './NavbarElements';
import { Link as LinkR } from 'react-router-dom';
import logo from '../../styles/logo.png';
import LogoWideWhite from '../../images/logo-white-wide.png';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MenuDrawer from './MenuDrawer';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container, useTheme } from '@material-ui/core';
import NotifyMe from 'react-notification-timeline';
import { Hidden } from "@material-ui/core";
import axios from "axios";
import moment from "moment-timezone";
import { loadUser, signOut } from '../../redux/actions/usersActions';
import { deleteNotification, DeleteNotification, loadNotification } from '../../redux/actions/notificationAction';
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LOCAL_HOST_SERVER_URL } from '../../api/utils';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginTop: 10,
  },
}));

const Navbar = ({ toggle }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user, isLogged } = useSelector(state => state.user);
  const mynotification = useSelector(state => state.notification.mytNotification);
  const userDetails = useSelector(state => state.user.userDetails);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [listNotifications, setNotifications] = useState([]);

  useEffect(() => {
    let notificationsList = [];
    if (mynotification.length > 0 && user._id) {
      for (let notification of mynotification) {
        if (notification.content && notification.date) {
          notificationsList.push({
            update: notification.content,
            timestamp: notification.date.valueOf(),
          });
        }
      }
      setNotifications(notificationsList);
    }
  }, [mynotification]);

  let myInterval = undefined;

  useEffect(() => {
    myInterval = setInterval(() => {
      if (user._id != undefined && user != undefined) {
        dispatch(loadNotification(user._id));
      }
    }, 30000);

    return () => {
      clearInterval(myInterval);
    };
  }, [user])


  const handleProfilePage = () => {
    history.push(`/profile/${user._id}`);
  }
  const handleHomePage = () => {
    history.push('/');
  }

  const deleteNotifi = () => {
    if (user._id != undefined) {
      dispatch(deleteNotification(user._id));
    }
  }
  const handleAboutPage = () => {
    history.push('/about');
  }
  const handleHomePageLogIn = () => {
    history.push('/home');
  }
  const handleSignupPage = () => {
    history.push('/signup');
  }

  const handleSignOutClick = () => {
    setAnchorEl(null);
    dispatch(signOut());
    history.push('/');
  }

  const renderMenu = (<NavMenu>
    {isLogged ? (
      <>

        <NavMenu>
          <NavItem>
            <NavLinks onClick={handleHomePageLogIn}>Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks onClick={handleAboutPage}>About</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks onClick={handleProfilePage}>My Profile</NavLinks>
          </NavItem>

        </NavMenu>

      </>
    ) : (
      <>
        <NavItem>
          <NavLinks onClick={handleHomePage}>Home</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks onClick={handleAboutPage}>About</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks onClick={handleSignupPage}>Sign Up</NavLinks>
        </NavItem>
      </>
    )
    }
  </NavMenu>
  );

  return (
    <>
      <Nav color={theme.palette.primary.main}>
        {isLogged && (<MenuDrawer />)}
        <NavbarContainer>
          { }
          {isLogged ? (
            <NavLogo to="/home"><Logo src={LogoWideWhite} className="img-responsive"></Logo></NavLogo>

          ) : (
            <NavLogo to="/"><Logo src={LogoWideWhite} className="img-responsive"></Logo></NavLogo>

          )
          }

          <MobileIcon onClick={toggle}>
            {isLogged && user ? (
              <Avatar src={user.profileImage ? `${LOCAL_HOST_SERVER_URL}${user.profileImage}` : ''} className={classes.avatar} />
            ) : (
              <AccountCircle fontSize="inherit" />
            )}
          </MobileIcon>

          <NavMenu>
            {renderMenu}
            {/* <NavItem>
                  <NavLinks >Home</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks onClick={toggle}>About</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks onClick={toggle}>Sign Up</NavLinks>
              </NavItem> */}
          </NavMenu>
          {isLogged ? (

            <RingIcon>

              <NotifyMe
                data={listNotifications}
                storageKey='notific_key'
                notific_key='timestamp'
                notific_value='update'
                heading=''
                sortedByKey={false}
                showDate={true}
                size={25}
                color="white"
                markAsReadFn={() => deleteNotifi()}
              />

            </RingIcon>) : (<h1 />)}

          {isLogged ?
            (<>
              <NavBtn>
                <NavBtnLink onClick={handleSignOutClick}>Sign Out</NavBtnLink>

              </NavBtn>
              <NavBtn>

                {/* <Notifi>
            <Hidden mdDown>

            <NotifyMe
            data={dats2}
            storageKey='notific_key'
            notific_key='timestamp'
            notific_value='update'
            heading=''
            sortedByKey={false}
            showDate={true}
            size={25}
            color="white"/>
            </Hidden>

            </Notifi> */}

              </NavBtn>

            </>
            ) :
            (<NavBtn>
              <NavBtnLink to="/SignIn">Sign In</NavBtnLink>
            </NavBtn>)}
        </NavbarContainer>
      </Nav>

    </>
  );
};

const Logo = styled.img`
  width: 60%;
  margin-bottom: 5px;
`
const Notifi = styled.div`
  margin-bottom: 10px;
  margin-left:10px;
  display: flex;

`
export const NavbarContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 80px;
z-index: 1;
width: 100%;
padding: 0 24px 0 0;
max-width: 1200px;
`;

export const Nav = styled.nav`
background: ${props => props.color};
height: 80px;
margin-top: -80px;
display: flex;
justify-items: center;
align-items: center;
font-size: 1.2rem;
position: sticky;
top: 0;
z-index: 10;

@media screen and (max-width:960px){
    transition: 0.8s all ease;
}
`;

export const NavLogo = styled(LinkR)`
color: #fff;
justify-self: flex-start;
cursor: pointer;
font-size: 1.5rem;
display: flex;
align-items: center;
font-weight: bold;
text-decoration: none;
`;


export default Navbar;