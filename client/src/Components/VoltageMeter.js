import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

let socket;
let device;

function VoltageMeter () {
    const [voltage, setVoltage] = useState('')

    useEffect(() => {
      socket = io(process.env.REACT_APP_baseURL)
    }, [process.env.REACT_APP_baseURL])
       
    device = localStorage.getItem('deviceID')

    useEffect(() => {
      socket.on('voltage_data', (data) =>{
        if(data !== null && data.id === device){
          setVoltage(data.volt.toFixed(2))
        } else{
          setVoltage(null)
        }
      })
    })

      return (
        <div>
            <h3>{voltage} V</h3>
            <h3> Voltage </h3>
        </div>
      );
  }
  

export default VoltageMeter
