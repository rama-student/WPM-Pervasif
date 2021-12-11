import * as React from 'react';
import { useEffect } from 'react';
import Charts from "./Components/Charts";
import UserPaper from "./Components/UserPaper";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/header.css"
import { Container } from 'react-bootstrap';
import VoltageMeter from "./Components/VoltageMeter";
import CurrentMeter from "./Components/CurrentMeter";
import PowerMeter from "./Components/PowerMeter";
import HistoryTable from "./Components/HistoryTable";
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
import { styled, withStyles } from '@material-ui/styles';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    backgroundColor: "red"
  }
});

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

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      device: '',
      isOpen: false,
    };
  }
  
  render(){
    axios.get(process.env.REACT_APP_baseURL + '/checkDevice' ,{
      headers:{
        "authtoken":localStorage.getItem("Token"),
      }
    }).then((response) => {
      console.log(response.data.device);
        if(response.data.device == null){
          this.setState({device: 'no'});
        }else{
          this.setState({device: 'yes'});
        }
    })


    const theme  = styles();
    // const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    // const [data, setdata] = React.useState('');
  
    const handleDrawerOpen = () => {
      this.setState({isOpen: true})
    };
  
    const handleDrawerClose = () => {
      this.setState({isOpen: false})
    };

    const logout = () => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("Token");
  
      window.location.pathname="/";
      };

    let dash;
    if(this.state.device == 'no'){
      dash = (
        <div className="containerTOP">
            <div class="box">
                <div className="formNewUser">
                    <h3>Input New Device</h3>
                </div>
                <hr></hr>
                <div className="IDform">
                    <form action="/addDevice" method="post">
                        <label><b>ID Device : </b></label>
                        <input name="idDevice" placeholder="Insert your device ID"></input>
                        <br></br>
                        <div className="btnPadBot">
                            <input className="btn btnposition"type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )
    }else{
      dash = (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={this.state.isOpen}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(this.state.isOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Wireless Power Meter
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={this.state.isOpen}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Device 1', 'Starred', 'Send email', 'Add Device'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
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
        {/* <h1>{ data }</h1> */}
          <div className='align-center'>
            <div class="float-child">
              <div>
                <UserPaper/>
              </div>
              <div>
                <div class="float-child2">
                  <VoltageMeter/>
                </div>
                <div class="float-child2">
                  <CurrentMeter/>
                </div>
                <div class="float-child2">
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
            <HistoryTable/>
          </div>
        </Container>
        </Box>
      </Box>
      )
    }


    return (
      <div>
        {dash}
      </div>
    ) 
  }
}

export default Dashboard;