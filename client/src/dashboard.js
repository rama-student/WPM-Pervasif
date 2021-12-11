import * as React from 'react';
import { useEffect } from 'react';
import Charts from "./Components/Charts";
import UserPaper from "./Components/UserPaper";
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/header.css"
import { Container } from 'react-bootstrap';
import VoltageMeter from "./Components/VoltageMeter";
import CurrentMeter from "./Components/CurrentMeter";
import PowerMeter from "./Components/PowerMeter";
import VirtuTable from "./VirtuTable";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  let history = useHistory();

  //check apakah user punya device
  axios.get(process.env.REACT_APP_baseURL + "/checkDevice", {
    headers:{
      "authtoken":localStorage.getItem("Token"),
    }
  }).then((res) => {
    if(res.data.device === null){
      history.push('/inputdevice');
    }else{
      //membuat pengaman agar tidak bisa mengganti url dashboard (berpindah ke dashboard user lain)
      let username = "/dashboard/" + res.data.username;
      if(window.location.pathname != username){
        history.push('/dashboard/' + res.data.username);
      }
    }
  })
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addDevice = () => {
    window.location.pathname = "/inputdevice" ;
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("Token");
    localStorage.removeItem("deviceID")

    window.location.pathname="/";
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Wireless Power Meter
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Device'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {/* <List>
            <ListItem button onClick={addDevice} key='Add Device'>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary='Add Device' />
            </ListItem>
          </List> */}
          <Divider />
          <List>
            <ListItem button onClick={logout} key='Logout'>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container>
            <div class="test">
              <div className='align-center'>
                <div class="float-child">
                  <div class="paper">
                    <UserPaper/>
                  </div>
                  <div>
                    <div class="float-child2 card">
                      <VoltageMeter/>
                    </div>
                    <div class="float-child2 card">
                      <CurrentMeter/>
                    </div>
                    <div class="float-child2 card">
                      <PowerMeter/>
                    </div>
                  </div>
                </div>
                <div class="float-child">
                  <Charts />
                </div>
              </div>
            </div>
          </Container>
          <Container>
              <div class="tableposition">
                <div class="vtable">
                  <VirtuTable/>
                </div>
              </div>
          </Container>
        </Box>
      </Box>
    );
  }
  

