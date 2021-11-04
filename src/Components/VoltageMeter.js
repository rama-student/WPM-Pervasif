import { render } from '@testing-library/react';
import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import { Paper } from '@material-ui/core';

class VoltageMeter extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [72],
        options: {
          chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: false
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 15, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#999',
                  opacity: 1,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: true,
                  offsetY: 25
                },
                value: {
                  offsetY: -30,
                  fontSize: '25px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Voltage level'],
        },
      
      
      };
    }

  

    render() {
      return (
        <div id="chart">
            <Chart 
            options={this.state.options} 
            series={this.state.series} 
            type="radialBar" 
            height="210"
            width="100%"
            />
        </div>
      );
    }
  }

export default VoltageMeter
