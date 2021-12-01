import React from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import { useState } from 'react';

function UserPaper() {
  const[firstname,setFirstName] = useState('')
  const[lastname,setLastName] = useState('')
  const[deviceid,setDeviceid] = useState('')
  
  const useStyles = makeStyles((theme) => ({
    yellowPaper: {
      backgroundColor: blue[400],
  }
}));
  
    const classes = useStyles();
    
  axios.get(process.env.REACT_APP_baseURL + '/dashboard/user', {
    headers:{
      "authtoken":localStorage.getItem("Token"),
    }
  })
    .then(function(response) {
      setFirstName(response.data.firstname)
      setLastName(response.data.lastname)
      setDeviceid(response.data.deviceID[0])
    })
    .catch(function(error){
      console.log(error);
    })

    return (
    <>
    <container>
        <div className={classes.root}>
            <Paper className={classes.yellowPaper} elevation="8">
              <Box p={1} boxShadow={5}>
                <Typography variant="h5">Name : {firstname} {lastname}</Typography>
                <Typography variant="h5">Device ID : {deviceid}</Typography>
              </Box>
            </Paper>
        </div>
    </container>
    </>
    )
}

export default UserPaper
