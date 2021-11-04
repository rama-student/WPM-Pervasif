import React from 'react';
import Chart from 'react-apexcharts';

function Charts() {
    return (
        <div class="container">
            <Chart
                options = {{
                    chart: {
                        background: '#f4f4f4',
                        foreColor: '#333'
                    },
                    xaxis: {
                        categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999]
                    }
                }}
                series={[
                    {
                        name: 'Sales',
                        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
                    }
                ]}
                type="line"
                height="300"
                width="100%"
            />
        </div>
    )
}

export default Charts
