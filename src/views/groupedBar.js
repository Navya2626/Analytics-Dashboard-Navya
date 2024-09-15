import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getData } from "../data/fetchData";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const GroupedBar = () => {
  const [electricVehicleData, setElectricVehicleData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Fetch data and set state
    const fetchData = async () => {
      const data = await getData();
      setElectricVehicleData(data);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  // Data preparation for Bar charts
  const modelYears = electricVehicleData.map((item) => item["Model Year"]);
  const electricRanges = electricVehicleData.map((item) => item["Electric Range"]);
  const legislativeDistricts = electricVehicleData.map((item) => item["Legislative District"]);

  return (
    <Card className="border" style={{ height: loading ? "500px" : "auto" }}>
      <CardContent style={{ padding: "0" }}>
        <Typography variant="h6" component="h2" style={{ backgroundColor: '#054992', padding: '10px', fontSize: '14px', color: '#fff' }}>
          <b>Electric Range and Legislative Districts by Model Year</b>
        </Typography>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>Loading...</div> // Use the custom loader class here
        ) : (
          <Plot
            responsive={true}
            config={{
              displaylogo: false,
              displayModeBar: true,
              modeBarButtonsToRemove: ["select2d", "lasso2d"]
            }}
            data={[
              {
                x: modelYears,
                y: electricRanges,
                type: "bar",
                name: "Electric Range",
                marker: { color: "orange" },
              },
              {
                x: modelYears,
                y: legislativeDistricts,
                type: "bar",
                name: "Legislative Districts",
                marker: { color: "#eb4034" },
              },
            ]}
            layout={{
              xaxis: {
                title: "Model Year",
                tickmode: "linear",
              },
              yaxis: {
                title: "Value",
              },
              barmode: "group",
              autosize: true,
              showlegend: true,
              legend: {
                font: { size: 12 },
                orientation: "h",
                x: 0.5,
                xanchor: "center",
                y: 1.1,
                yanchor: "bottom",
              },
              margin: {
                autoexpand: true,
                l: 60,
                r: 10,
                t: 100,
                b: 70,
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GroupedBar;
