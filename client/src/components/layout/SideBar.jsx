import React, { useState } from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarLink, SideBtnWrap, SidebarWrapper, SidebarRoute, SidebarMenu } from './SideBarElements';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/actions/usersActions';
import { useTheme } from '@material-ui/core';

const SideBar = ({ isOpen, toggle }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user, isLogged } = useSelector(state => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfilePage = () => {
    history.push(`/profile/${user._id}`);
  }

  const handleSignOutClick = () => {
    setAnchorEl(null);
    dispatch(signOut());
    history.push('/');
  }
  const data =  [
    {
        "update":"70 new employees are shifted",
        "timestamp":1596119688264
    },
    {
        "update": "Time to Take a Break, TADA!!!",
        "timestamp":1596119686811
    },
    {
        "update":"70 new employees are shifted",
        "timestamp":1596119688264
    },
    {
        "update": "Time to Take a Break, TADA!!!",
        "timestamp":1596119686811
    }
]

  //-------------------------------------------------------
  const renderMenu = (<SidebarMenu> {  isLogged ? (
    <>
      <SidebarLink to='/home'>Home</SidebarLink>
      <SidebarLink to="/about">About</SidebarLink>
      <SidebarLink onClick={handleProfilePage}>My Profile</SidebarLink>
      <SideBtnWrap>
        <SidebarRoute onClick={handleSignOutClick}>Sign Out</SidebarRoute>
      </SideBtnWrap>
  
    </>
  ) : (
    <>
      <SidebarLink to="/">Home</SidebarLink>
      <SidebarLink to="/about"> About</SidebarLink>
      <SidebarLink to="signup"> Sign up</SidebarLink>
      <SideBtnWrap>
        <SidebarRoute to="/signin">Sign In</SidebarRoute>
      </SideBtnWrap>
    </>
  )}
  </SidebarMenu>);
  //-------------------------------------------------------

  return (
    
    <SidebarContainer color={theme.palette.primary.main} isOpen={isOpen} onClick={toggle}>
   
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        {renderMenu}
        {/* <SidebarMenu>
                    <SidebarLink to="/signin" onClick={toggle}>Home</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> ttt</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}> About</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/signin">Sign In</SidebarRoute>
                </SideBtnWrap> */}
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default SideBar;