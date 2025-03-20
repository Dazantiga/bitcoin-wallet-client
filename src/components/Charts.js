import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const SalesValueChart = () => {
  const data = [
    { name: 'Mon', value: 1 },
    { name: 'Tue', value: 2 },
    { name: 'Wed', value: 2 },
    { name: 'Thu', value: 3 },
    { name: 'Fri', value: 3 },
    { name: 'Sat', value: 4 },
    { name: 'Sun', value: 3 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip formatter={(value) => [`$${value}k`, 'Value']} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          fill="#8884d8"
          fillOpacity={0.3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const SalesValueChartphone = () => {
  const data = [
    { name: 'Mon', value: 1 },
    { name: 'Tue', value: 2 },
    { name: 'Wed', value: 2 },
    { name: 'Thu', value: 3 },
    { name: 'Fri', value: 3 },
    { name: 'Sat', value: 4 },
    { name: 'Sun', value: 3 }
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip formatter={(value) => [`$${value}k`, 'Value']} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          fill="#8884d8"
          fillOpacity={0.3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const CircleChart = (props) => {
  const { series = [], donutWidth = 20 } = props;
  const data = series.map((value, index) => ({
    value,
    name: `Series ${index + 1}`
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => {
            const total = series.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return [`${percentage}%`, name];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const BarChart = (props) => {
  const { labels = [], series = [], chartClassName = "" } = props;
  const data = labels.map((label, index) => ({
    name: label,
    value: series[0][index]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
