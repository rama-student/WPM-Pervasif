import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

let socket;
let device;

function PowerMeter () {
    const [power, setPower] = useState('')

    useEffect(() => {
      socket = io(process.env.REACT_APP_baseURL)
    }, [process.env.REACT_APP_baseURL])

    device = localStorage.getItem('deviceID')
    
    useEffect(() => {
      socket.on('power_data', (data) =>{
        if(data !== null && data.id === device){
          setPower(data.power.toFixed(2))
        } else if(data.id !== '94:B9:7E:D9:B5:10'){
          setPower(null)
        }
      })
    })

      return (
        <div>
            <h3>{power} W</h3>
            <h3> Power </h3>
        </div>
      );
  }
  

export default PowerMeter
