import React from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import io from 'socket.io-client';

let socket;

class Charts extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            options: {
                chart: {
                    background: '#f4f4f4',
                    foreColor: '#333',
                },
                xaxis: {
                    categories: []
                }
            },
            series:[
                {
                    name: 'Sales',
                    data: [],
                }
            ],
        }
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_baseURL + "/dataChart",{
            headers:{
                'authtoken': localStorage.getItem("Token"),
            }
        }).then((response) => {
            for(let i = 0; i < 20; i++){
                //cara meng'setState' object dalam array pada constructor
                //https://forum.freecodecamp.org/t/reactjs-using-setstate-to-update-a-single-property-on-an-object/146772
                let power = JSON.parse(JSON.stringify(this.state.series))
                    power[0].data.push(response.data[i].power)
                    this.setState({series: power})

            }
        })

        // const interval = setInterval(() => {
        //     axios.get(process.env.REACT_APP_baseURL + "/data", {
        //       headers:{
        //         "authtoken":localStorage.getItem("Token"),
        //       }
        //     })
        //     .then((response) => {
        //         let power = JSON.parse(JSON.stringify(this.state.series))
        //         power[0].data.shift()
        //         this.setState({series: power})
        //         power[0].data.push(response.data.power)
        //         this.setState({series: power})
        //     })
        //   }, 1000); //inverval waktu

        socket = io(process.env.REACT_APP_baseURL)
        socket.on('chart_data', (data) =>{
            let power = JSON.parse(JSON.stringify(this.state.series))
            power[0].data.shift()
            this.setState({series: power})
            power[0].data.push(data)
            this.setState({series: power})
        })    
  
    }

    render(){
        return (
            <div class="container">
                <Chart
                    options = {this.state.options}
                    series= {this.state.series}
                    type="line"
                    height="300"
                    width="100%"
                />
            </div>
        )
    }
}

export default Charts
