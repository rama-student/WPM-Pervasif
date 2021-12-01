import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';

// if(localStorage.getItem("Token") || localStorage.getItem("isAuthenticated")){
//   history.push('/dashboard');
// }

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        WPM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignIn() {

  const history = useHistory();
  const user = localStorage.getItem('Token')
  if(user !== 'undefined'){
    axios.get(process.env.REACT_APP_baseURL + "/dashboard/user", {
      headers:{
        "authtoken":localStorage.getItem("Token"),
      }
    }).then((res) => {
      history.push('/dashboard/' + res.data.firstname + res.data.lastname);
    })
  }

  const [fail,setloginstatus] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.clear();
    const data = new FormData(event.currentTarget);

    //sending login data to server (server.js)
    axios.post(process.env.REACT_APP_baseURL + "/login", { //to specif end point
      username: data.get('email'),
      password: data.get('password'),
    }).then((response) => {
      if(response.data.status === 1){
        //memasukan authentikasi login ke localstorage agar bisa masuk ke dashboard
        localStorage.setItem("isAuthenticated", true)
        localStorage.setItem("Token", response.data.access)

        //jika user belum memiliki device, maka user akan diarahkan untuk memasukan device terlebih dahulu
        if(response.data.deviceid.length === 0){
          window.location.pathname="/inputdevice";
        }else{ //jika user sudah memiliki device, maka bisa langsung ke dashboard
          window.location.pathname="/dashboard/" + response.data.username;
        }

      } else if(response.data.status === 2){ //jika user salah memasukan email/password
        setloginstatus(response.data.messages);
      }
    })
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <h6>{fail}</h6>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}