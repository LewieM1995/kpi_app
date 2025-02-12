

import { AgCharts } from "ag-charts-react";

const RightFirstTimeChart = ({data}) => {
  const rightFirstTimePercentage = data;

  const processedData = [
    {
      status: "Right First Time",
      percentage: rightFirstTimePercentage,
    },
    {
      status: "Adjustments Needed",
      percentage: 100 - rightFirstTimePercentage,
    },
  ];

  const options = {
    height: 500,
    data: processedData,
    series: [
      {
        type: "pie",
        angleKey: "percentage",
        calloutLabelKey: "status",
        sectorLabelKey: "percentage",
        fills: ["#4CAF50", "#F44336"],
        strokeWidth: 0,
      },
    ],
    title: { text: "Right First Time Performance" },
    legend: {
      enabled: true,
      position: "bottom",
    },
  };

  return <AgCharts options={options} />;
};

export default RightFirstTimeChart;
