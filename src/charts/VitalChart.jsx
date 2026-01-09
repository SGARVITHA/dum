import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const VitalChart = ({ data, parameter, color }) => (
  <LineChart width={300} height={200} data={data}>
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey={parameter} stroke={color} />
  </LineChart>
);

export default VitalChart;
