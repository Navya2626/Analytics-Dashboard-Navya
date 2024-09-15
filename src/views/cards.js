import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getData } from "../data/fetchData";

// Define styled components with vibrant dark colors
const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
    margin: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: bgcolor,
    color: '#fff', // Ensure text is white for good contrast
    height: '80%', // Ensure cards have a minimum height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));



const VehicleSummary = () => {
    const electricVehicleData = getData();

    // Calculate total number of vehicles
    const totalVehicles = electricVehicleData.length;

    // Aggregate data
    const makeCount = {}; // Change to track counts by make
    const electricRanges = [];
    const cafvEligibilityCount = { eligible: 0, notEligible: 0, unknown: 0 };

    electricVehicleData.forEach(vehicle => {
        const make = vehicle.Make;
        makeCount[make] = (makeCount[make] || 0) + 1;
        electricRanges.push(vehicle["Electric Range"]);

        if (vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"].includes("Eligible")) {
            cafvEligibilityCount.eligible++;
        } else if (vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"].includes("Not eligible")) {
            cafvEligibilityCount.notEligible++;
        } else {
            cafvEligibilityCount.unknown++;
        }
    });

    // Calculate average electric range
    const averageElectricRange = (electricRanges.reduce((a, b) => a + b, 0) / electricRanges.length).toFixed(2);

    // Get top 3 makes
    const topMakes = Object.entries(makeCount)
        .sort(([, a], [, b]) => b - a) // Sort by count descending
        .slice(0, 3); // Get top 3

    return (
        <Grid container columnSpacing={1}>
            {/* Card for Total Number of Vehicles */}
            <Grid item xs={12} sm={3} md={3}>
                <StyledCard bgcolor="#166303"> {/* Dark Green */}
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom style={{ fontSize: '16px' }}>
                            <b>Total Number of Vehicles</b>
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom style={{ fontSize: '14px' }}>
                            {totalVehicles}
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>

            {/* Card for Average Electric Range */}
            <Grid item xs={12} sm={3} md={3}>
                <StyledCard bgcolor="#AD0B0B"> {/* Dark Red */}
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom style={{ fontSize: '16px' }}>
                           <b>Average Electric Range</b>
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom style={{ fontSize: '14px' }}>
                            {averageElectricRange} miles
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>

            {/* Card for CAFV Eligibility */}
            <Grid item xs={12} sm={3} md={3}>
                <StyledCard bgcolor="#CF7808"> {/* Dark Orange */}
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom style={{ fontSize: '14px' }}>
                            <b>CAFV Eligibility</b>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4} sm={4}>
                                <Typography variant="h6" component="div" gutterBottom style={{ fontSize: '14px' }}>
                                  <b>Eligible</b>  
                                </Typography>
                                <Typography variant="body1" component="div" style={{ fontSize: '12px' }}>
                                    {cafvEligibilityCount.eligible}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <Typography variant="h6" component="div" gutterBottom style={{ fontSize: '14px' }}>
                                    <b>Not Eligible</b>
                                </Typography>
                                <Typography variant="body1" component="div" style={{ fontSize: '12px' }}>
                                    {cafvEligibilityCount.notEligible}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4}>
                                <Typography variant="h6" component="div" gutterBottom style={{ fontSize: '14px' }}>
                                   <b>Unknown</b> 
                                </Typography>
                                <Typography variant="body1" component="div" style={{ fontSize: '12px' }}>
                                    {cafvEligibilityCount.unknown}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </StyledCard>
            </Grid>

            {/* Card for Top 3 Makes */}
            <Grid item xs={12} sm={3} md={3}>
                <StyledCard bgcolor="#005691"> {/* Dark Purple */}
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom style={{ fontSize: '16px' }}>
                           <b>Top 3 Makes</b>
                        </Typography>
                        <Typography variant="body2" component="div" gutterBottom style={{ fontSize: '14px' }}>
                            <Grid container spacing={2}>
                                {topMakes.map(([make, count]) => (
                                    <Grid item xs={4} sm={4} md={4} key={make}>
                                        <Typography variant="h6" component="div" gutterBottom style={{ fontSize: '14px' }}>
                                          <b>{make}</b>  
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontSize: '12px' }}>
                                            {count}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    );
};

export default VehicleSummary;
