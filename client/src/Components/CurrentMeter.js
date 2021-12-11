import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

let socket;
let device;

function CurrentMeter () {
    const [current, setCurrent] = useState('')

    useEffect(() => {
      socket = io(process.env.REACT_APP_baseURL)
    }, [process.env.REACT_APP_baseURL])
       
    device = localStorage.getItem('deviceID')

    useEffect(() => {
      socket.on('current_data', (data) =>{
        if(data !== null && data.id === device){
          setCurrent(data.curr.toFixed(2))
        } else{
          setCurrent(null)
        }
      })
    })

      return (
        <div>
            <h3>{current} A</h3>
            <h3> Current </h3>
        </div>
      );
  }
  

export default CurrentMeter
