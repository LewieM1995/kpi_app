
import { AgCharts } from "ag-charts-react";

const PantoneTargetingChart = ({data}) => {
  const pantoneAccuracy = data
  const processedData = [
    {
      status: "Correct Colour Target",
      percentage: pantoneAccuracy,
    },
    {
      status: "Incorrect Colour Target",
      percentage: 100 - pantoneAccuracy,
    },
  ];

  const options = {
    height: 500,
    data: processedData,
    series: [
      {
        type: "pie",
        angleKey: "percentage",
        labelKey: "status",
        calloutLabelKey: "status",
        sectorLabelKey: "percentage",
        fills: ["#4CAF50", "#F44336"],
        strokeWidth: 0,
      },
    ],
    title: { text: "Pantone Targeting Accuracy" },
    legend: {
      enabled: true,
      position: "bottom",
    },
  };

  return <AgCharts options={options} />;
};

export default PantoneTargetingChart;