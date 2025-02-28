import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const textCenterPlugin = {
  id: "textCenter",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.restore();

    const text1 = "27";
    const text2 = "Assigned";

    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.fillText(text1, centerX, centerY - 10);
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#666";
    ctx.fillText(text2, centerX, centerY + 15);
    ctx.save();
  },
};

const DoughnutChart = () => {
  const data = {
    labels: ["Completed", "Inprocess", "Overdue", "Remaining"],
    datasets: [
      {
        data: [9, 10, 3, 5],
        backgroundColor: [
          "rgba(56, 199, 118, 1)", // Green - Completed
          "rgba(255, 138, 0, 1)", // Orange - In Process
          "rgba(255, 68, 88, 1)", // Red - Overdue
          "rgba(215, 215, 215, 1)", // Grey - Remaining
        ],
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ width: "200px", height: "200px" }}>
      <Doughnut data={data} options={options} plugins={[textCenterPlugin]} />
    </div>
  );
};

export default DoughnutChart;
