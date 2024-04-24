import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { saleReport } from '../../axios';

const SalesReportGraph = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await saleReport();
                console.log(response.data);
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();
    }, []);

    const months = salesData.map(item => item.month);
    const totalSales = salesData.map(item => item.totalSale);

    const data = {
        labels: months,
        datasets: [{
            label: 'Total Sales',
            data: totalSales,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const options = {
      scales: {
          yAxes: [{
              title: {
                  display: true,
                  text: 'Total Sales',
              },
              ticks: {
                  beginAtZero: true,
              },
          }],
          xAxes: [{
              title: {
                  display: true,
                  text: 'Month',
              },
          }],
      },
  };

    return (
        <div>
            <h2>Sales Report</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default SalesReportGraph;
