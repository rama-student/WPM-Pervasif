import React from 'react'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function CurrentMeter () {
    const [current, setCurrent] = useState('')

    useEffect(() => {
      socket = io(process.env.REACT_APP_baseURL)
    }, [process.env.REACT_APP_baseURL])
       
    useEffect(() => {
      socket.on('current_data', (data) =>{
        if(data !== null){
          setCurrent(data.toFixed(2))
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
