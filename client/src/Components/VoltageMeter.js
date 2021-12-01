import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function VoltageMeter () {
    const [voltage, setVoltage] = useState('')

    useEffect(() => {
      socket = io(process.env.REACT_APP_baseURL)
    }, [process.env.REACT_APP_baseURL])
       
    useEffect(() => {
      socket.on('voltage_data', (data) =>{
        if(data !== null){
          setVoltage(data.toFixed(2))
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
