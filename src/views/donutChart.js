import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getData } from "../data/fetchData";
import { Card, CardContent, Typography } from "@mui/material";
import { useMediaQuery } from '@mui/material';


const DonutChart = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const [electricVehicleData, setElectricVehicleData] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], values: [] });
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch data from getData
    useEffect(() => {
        const fetchVehicleData = async () => {
            setLoading(true); // Set loading to true before fetching data
            const data = await getData();
            setElectricVehicleData(data);

            // Process data to group by model and sum electric ranges
            const modelElectricRanges = {};

            data.forEach((vehicle) => {
                const model = vehicle.Model;
                const electricRange = vehicle["Electric Range"] || 0;

                // Filter out vehicles with 0 electric range
                if (electricRange > 0) {
                    if (modelElectricRanges[model]) {
                        modelElectricRanges[model] += electricRange;
                    } else {
                        modelElectricRanges[model] = electricRange;
                    }
                }
            });

            // Extract labels (models) and values (electric ranges)
            const labels = Object.keys(modelElectricRanges);
            const values = Object.values(modelElectricRanges);

            setChartData({ labels, values });
            setLoading(false); // Set loading to false after data is processed
        };

        fetchVehicleData();
    }, []);

    // Plot the donut chart
    const layout = {

        annotations: [
            {
                font: {
                    size: 10
                },
                showarrow: false,
                text: 'Range',
                x: 0.5,
                y: 0.5
            }
        ],
        showlegend: !isMobile,
    };

    const data = [
        {
            values: chartData.values,
            labels: chartData.labels,
            hoverinfo: 'label+percent', // Shows label and percentage
            hole: 0.4,
            type: 'pie',
            textinfo: 'label+percent', // Controls what text is displayed on the chart
            textposition: 'inside', // Text inside the donut
            marker: {
                line: {
                    width: 0 // Remove the separator lines
                }
            }
        }
    ];

    return (

        <Card className="border" style={{ height: loading ? '500px' : 'auto' }}>
            <CardContent style={{ padding: '0' }}>
                <Typography variant="h6" component="h2" style={{ backgroundColor: '#054992', padding: '10px', fontSize: '14px', color: '#fff' }}>
                    <b>Electric Vehicle Range Distribution</b>
                </Typography>
                {loading ? (
                    <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:'400px' }}>Loading...</div> // Use the custom loader class here
                ) : (
                    <Plot
                        responsive={true}
                        data={data}
                        layout={layout}
                        style={{ width: '100%', height: '100%' }}
                        config={{
                            displayModeBar: false // Hide the mode bar
                        }}
                    />
                )}
            </CardContent>
        </Card>

    );
};

export default DonutChart;
