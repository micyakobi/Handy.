import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { FiArrowRightCircle } from "react-icons/fi";
import { FaBars } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { StyledLink } from '../../styles/styles';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import UpdateIcon from '@material-ui/icons/Update';
import logoW from '../../styles/logoW.png';
import LogoBlueWide from '../../images/logo-blue-wide.png';
import styled from 'styled-components';
//-------------------------------------------
import { FcHome, FcLike, FcPlus, FcViewDetails, FcSurvey, FcGlobe, FcTodoList, FcSearch } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1, 0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    padding: '1rem',
  },
  menuButton: {
    marginLeft: '0.5rem',
  }
}));

const mainLinks = (userId) => [
  {
    id: '1',
    name: 'Home',
    route: '/home',
    icon: FcHome ,//HomeIcon
  },

  {
    id: '2',
    name: 'Main Map',
    route: '/mainMap',
    icon: FcGlobe,//UpdateIcon
  },
]

const clientLinks = [
  {
    id: '1',
    name: 'Find A Handy',
    route: '/findhandy',
    icon: FcSearch,//SearchIcon
  },
  {
    id: '2',
    name: 'Favorite Handies',
    route: '/favorites',
    icon: FcLike,//FavoriteIcon
  },
  {
    id: '3',
    name: 'My Tasks',
    route: '/mytasks',
    icon: FcSurvey,//AssignmentIcon
  },
  {
    id: '4',
    name: 'Post A Task',
    route: '/posttask',
    icon: FcPlus,//AddCircleIcon
  },
  // {
  //   id: '5',
  //   name: 'Add A Review',
  //   route: '/addreview',
  //   icon: AddCircleIcon,
  // },
]

const providerLinks = [
  {
    id: '1',
    name: 'Tasks Feed',
    route: '/taskfeed',
    icon: FcViewDetails,//ListAltIcon
  },
  {
    id: '2',
    name: 'My Offers',
    route: '/myoffers',
    icon: FcTodoList,//ThumbsUpDownIcon
  },
]

const MenuDrawer = () => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(state => state.user.user);
  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuOpen(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.drawerHeader}>
        <Logo src={LogoBlueWide} className="img-responsive"></Logo>
        <IconButton onClick={toggleDrawer(false)}>
          {<ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {mainLinks(user.id).map(link => (
          <StyledLink
            to={link.route}
            key={link.id}>
            <ListItem button>
              <ListItemIcon>{<link.icon />}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <Divider />
      <List>
        {user.isClient && clientLinks.map(link => (
          <StyledLink
            to={link.route}
            key={link.id}>
            <ListItem button>
              <ListItemIcon>{<link.icon />}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <Divider />
      <List>
        {user.isProvider && providerLinks.map(link => (
          <StyledLink
            to={link.route}
            key={link.id}>
            <ListItem button>
              <ListItemIcon>{<link.icon />}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </div >
  );

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
      >
        <StyledMenuIcon fontSize="large" color={theme.palette.common.text} />
      </IconButton>
      <Drawer anchor={'left'} open={menuOpen} onClose={toggleDrawer(false)}>
        {list('left')}
      </Drawer>
    </>
  );
}


const Logo = styled.img`
    width: 80%;
    margin-bottom: 5px;
`

const StyledMenuIcon = styled(MenuIcon)`
  color: ${props => props.color};
`;

export default MenuDrawer;