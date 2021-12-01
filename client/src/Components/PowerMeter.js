import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function PowerMeter () {
    const [power, setPower] = useState('')

    useEffect(() => {
      socket = io(process.env.REACT_APP_baseURL)
    }, [process.env.REACT_APP_baseURL])
       
    useEffect(() => {
      socket.on('power_data', (data) =>{
        if(data !== null){
          setPower(data.toFixed(2))
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
