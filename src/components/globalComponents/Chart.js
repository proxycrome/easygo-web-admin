import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { themes } from "../../globalAssets/theme";

const exampleData = [
  {
    merchant: "January",
    uv: 4000,
    amount: 2400,
    amt: 2400,
  },
  {
    merchant: "February",
    uv: 3000,
    amount: 1398,
    amt: 2210,
  },
  {
    merchant: "March",
    uv: 2000,
    amount: 9800,
    amt: 2290,
    isRed: true,
  },
  {
    merchant: "April",
    uv: 2780,
    amount: 3908,
    amt: 2000,
  },
  {
    merchant: "May",
    uv: 1890,
    amount: 4800,
    amt: 2181,
  },
  {
    merchant: "June",
    uv: 2390,
    amount: 3800,
    amt: 2500,
  },
  {
    merchant: "July",
    uv: 3490,
    amount: 4300,
    amt: 2100,
  },
  {
    merchant: "August",
    uv: 2780,
    amount: 3908,
    amt: 2000,
  },
  {
    merchant: "September",
    uv: 2000,
    amount: 9800,
    amt: 2290,
  },
  {
    merchant: "October",
    uv: 4000,
    amount: 2400,
    amt: 2400,
  },
  {
    merchant: "November",
    uv: 4000,
    amount: 4900,
    amt: 2400,
  },
  {
    merchant: "December",
    uv: 4000,
    amount: 9400,
    amt: 2400,
  },
];

export const LineChartt = ({
  width,
  data = exampleData,
  valueKey = "merchant",
  dataKey = "amount",
  isRed = false,
}) => {
  return (
    <LineChart
      width={width}
      height={300}
      data={data}
      margin={{
        top: 30,
        right: 50,
        left: 20,
        bottom: 0,
      }}
    >
      <CartesianGrid vertical={false} strokeDasharray="" />
      <XAxis axisLine={false} tickLine={false} dataKey={valueKey} />
      <YAxis
        axisLine={false}
        tickFormatter={(value)=>value.toLocaleString()}
      />
      <Tooltip />
      <Line
        dot={false}
        strokeWidth={2}
        type="monotone"
        dataKey={dataKey}
        stroke={isRed ? themes.red : "#6236ff"}
      />
    </LineChart>
  );
};
